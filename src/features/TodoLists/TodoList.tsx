import React, {useEffect, useState} from "react";
import {AppUseDispatch, useAppSelector} from "../../App/store";
import {fetchTasks} from "./Tasks/task-reduser";
import {Box, Card, CardContent, Grid, ImageListItem, Paper, Typography} from "@mui/material";


type PropsType = {
    id: string
    title: string
}

export const TodoList: React.FC<PropsType> = ({
                                                  id,
                                                  title
                                              }) => {
    const [OnOff, setOnOff] = useState(false)
    const dispatch = AppUseDispatch()
    const tasks = useAppSelector(state => state.tasks)
    useEffect(() => {
        dispatch(fetchTasks(id))
    }, [])

    return (
        <Grid item style={{margin: '10px'}}>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        m: 1,
                        width: 200,
                        height: 200,
                    },
                }}
            >
                <Paper elevation={3}  style={{padding: '20px'}}>

                        <h3>{title}</h3>


                    {!!tasks[id] ? tasks[id].map(i => <div key={i.id}>{i.title}</div>) : ''}

                </Paper>
            </Box>
            {/*<Card variant={'outlined'} sx={{maxWidth: 345}}>*/}
            {/*    <CardContent>*/}
            {/*        <Typography gutterBottom variant="h3" component="div">*/}
            {/*            {title}*/}
            {/*        </Typography>{!!tasks[id] ? tasks[id].map(i => (*/}
            {/*        <Typography variant="body2" color="text.secondary">*/}
            {/*            <div key={i.id}>{i.title}</div>*/}
            {/*        </Typography>*/}
            {/*    )) : ''}*/}
            {/*    </CardContent>*/}
            {/*</Card>*/}

        </Grid>


    )
}