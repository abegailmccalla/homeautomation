import {defineStore} from 'pinia'
import {ref} from 'vue'


export const useAppStore =  defineStore('app', ()=>{

    /*  
    The composition API way of defining a Pinia store
    ref() s become state properties
    computed() s become getters
    function() s become actions  
    */ 

    // STATES 
  


    // ACTIONS
    const getUpdateData= async (data) => {
        const controller = new AbortController();
        const signal = controller.signal;
        const id= setTimeout(() => controller.abort(), 60000);
        const URL= '/api/update';
        try {
                 const response = await fetch(URL, {
                     method: 'POST',
                     signal: signal,
                     headers: {
                         'Content-Type': 'application/json'
                     },
                     body: JSON.stringify(data)
                 });
                 const result = await response.json();
                 clearTimeout(id);
                 return result;
             } catch (error) {
                 clearTimeout(id);
                 return {status: 'getUpdatedata error', message: error.message};
             }
             return [];
    }

    const setPasscode = async (data) => {
        // FETCH REQUEST WILL TIMEOUT AFTER 20 SECONDS
        const controller = new AbortController();
        const signal = controller.signal;
        const id = setTimeout(() => { controller.abort() }, 60000);
        const URL = `/api/set/combination`;
        console.log(data);
        let text = data.toString();
        try {
            const response = await fetch(URL, { method: 'POST', signal: signal, body: JSON.stringify({"code": text}), headers: {'Content-Type': 'application/json'}});
            const result = await response.json();
            clearTimeout(id);
            return result;
        }
        catch (err) {
            clearTimeout(id);
            return {status: 'setPasscode error', message: err.message};
        }
        return []
    }

    const getCheckPwd= async (data) => {
        const controller = new AbortController();
        const signal = controller.signal;
        const id= setTimeout(() => controller.abort(), 60000);
        const URL= '/api/check/combination'; 
        try {
            const response = await fetch(URL, {
                method: 'POST',
                signal: signal,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            clearTimeout(id);
            return result;
        } catch (error) {
            clearTimeout(id);
            return {status: 'getCheckPwd error', message: error.message};
        }
        return [];
    }
            
    const getReserve = async (start, end) => {
        const controller = new AbortController();
        const signal = controller.signal;
        const id = setTimeout(() => { controller.abort() }, 60000);
        const URL = `/api/reserve/${start}/${end}`;
        try {
            const response = await fetch(URL, { method: 'GET', signal: signal });
            if (response.ok) {
                const data = await response.json();
                let keys = Object.keys(data);
                if (keys.includes("status")) {
                    if (data["status"] == "found") {
                        return data["data"];
                    }
                    if (data["status"] == "failed"
                    ) {
                        console.log("getReserve returned no data");
                    }
                }
            }
            else {
                const data = await response.text();
            }
        }
        catch (err) {

            console.error('getReserve error:', err.message);
        }
        return []
    }

    // const updateCard = async (start, end) => {
    //     // FETCH REQUEST WILL TIMEOUT AFTER 20 SECONDS
    //     const controller = new AbortController();
    //     const signal = 
    //     controller.signal;
    //     const id = setTimeout(() => { controller.abort() }, 60000);
    //     const URL = `/api/avg/${start}/${end}`;
    //     try {
    //         const response = await fetch(URL, { method: 'GET', signal: signal });
    //         if (response.ok) {
    //             const data = await response.json();
    //             let keys = Object.keys(data);
    //             if (keys.includes("status")) {
    //                 if (data["status"] == "found") {
    //                     return data["data"];
    //                 }
    //                 if (data["status"] == "failed"
    //                 ) {
    //                     console.log("updateCard returned no data");
    //                 }
    //             }
    //         }
    //         else {
    //             const data = await response.text();
    //         }
    //     }
    //     catch (err) {

    //         console.error('updateCard error:', err.message);
    //     }
    //     return []
    // } 
    const updateCard = async (start,end) => {
        const controller = new AbortController();
        const signal = controller.signal;
        const id = setTimeout(() => { controller.abort() }, 60000);
        const URL = `/api/avg/${start}/${end}`;
        try {
            const response = await fetch(URL, { method: 'GET', signal: signal });
            if (response.ok) {
                const data = await response.json();
                let keys = Object.keys(data);
                if (keys.includes("status")) {
                    if (data["status"] == "found") {
                        console.log(data["data"]);
                        return data["data"];
                    }
                    if (data["status"] == "failed"
                    ) {
                        console.log("updateCard returned no data");
                    }
                }
            }
            else {
                const data = await response.text();
                console.log(data);
            }
        }
        catch (err) {

            console.error('updateCard error:', err.message);
        }
        return []
    }
 
 
    return { 
    // EXPORTS	
        getUpdateData,
        setPasscode,
        getCheckPwd,
        updateCard,
        getReserve
        
       }
},{ persist: true  });