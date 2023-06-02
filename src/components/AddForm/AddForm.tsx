import { useFormik } from "formik"
import React from "react";
import {Button, TextField} from "@mui/material";

type PropsAddForm={
    title:string
    callBack:(value:string)=>void
}
export const AddForm:React.FC<PropsAddForm> = ({callBack,title}) => {

    const formik = useFormik({
        validate:(values)=>{
            if (!values.value){
                return {value: 'value is required'}
            }
        },
        initialValues: {
            value: '',
        },
        onSubmit: (values,FormikHelpers) => {
            callBack(values.value)
            FormikHelpers.resetForm({values:{value:''}})
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <TextField label={title} variant="outlined" {...formik.getFieldProps('value')}/>
            <Button type={"submit"} style={{height:'55px'}}>ADD</Button>
        </form>

    )
}