import { useFormik } from "formik"

export const AddToDoForm = () => {

    const formik = useFormik({
        validate:(values)=>{
            if (!values.value){
                return {value: 'value is required'}
            }
        },
        initialValues: {
            value: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values.value))
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <input {...formik.getFieldProps('value')}/>
            <button type={"submit"}>+</button>
        </form>

    )
}