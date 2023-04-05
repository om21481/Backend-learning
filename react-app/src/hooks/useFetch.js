import React from "react"
import axios from "axios"

export const useFetch = (url) => {
    const [data, setData] = React.useState();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState();

    React.useEffect(() => {
        async function a(){
            setLoading(true);
            try{
                const res = await axios.get(url);
                setData(res.data);
                setLoading(false);
            }
            catch(err){
                console.log(err);
                setError(err);
            }
        }

        a()
        
    }, [url])

    return {data, loading, error}
}