import { useFormik } from "formik"
import React from "react";

type PropsAddForm={
    callBack:(value:string)=>void
}
export const AddForm:React.FC<PropsAddForm> = ({callBack}) => {

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
            callBack(values.value)
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <input {...formik.getFieldProps('value')}/>
            <button type={"submit"}>+</button>
        </form>

    )
}