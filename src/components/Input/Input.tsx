import styles from './Input.module.css'

interface IInputProps {
    type: string,
    placeholder: string
}

const Input = ({ type, placeholder }: IInputProps) => {
  return (
    <input type={type} placeholder={placeholder} className={styles.input} />
  )
}

export default Input