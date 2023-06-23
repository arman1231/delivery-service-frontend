const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST') {
    const newId = Math.floor(Math.random() * 1000); // generate a new ID
    const newParcels = req.body.order.parcels.map(parcel => {
      return { ...parcel, id: Math.floor(Math.random() * 1000) }; // add custom ID to each parcel
    });
    const newData = { ...req.body.order, parcels: newParcels, status: 'CREATED' }; // exclude order field and add custom fields
    req.body = { id: newId, ...newData }; // update the request body with the new data
  }
  next();
});
// router.render = (req, res) => {
//   if (req.method === 'POST') {
//       const newId = Math.floor(Math.random() * 1000); // generate a new ID
//       const newParcels = res.locals.data.order.parcels.map(parcel => {
//         return { ...parcel, id: Math.floor(Math.random() * 1000) }; // add custom ID to each parcel
//       });
//       const newData = { ...res.locals.data.order, parcels: newParcels, status: 'CREATED' }; // keep destination field and add custom fields
//       res.jsonp({ id: newId, ...newData }); // send the response back to the client
//     } else {
//       res.jsonp(res.locals.data);
//     }
//   };

server.use(router);
server.listen(3777, () => {
  console.log('JSON Server is running');
});