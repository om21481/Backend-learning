import React from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

const Hotels = () =>{
    const {data, loading, error} = useFetch('/hotels/');
    console.log(data);
    return(
        <>
        {data? (
            <div>
                {data.map((d) =>{
                    return(<h1 key={d._id}>{d._id}</h1>)
                })}
            </div>

        ) : (<h1>{"This page is givig error"}</h1>)}
        </>
    )
}
export default Hotels;