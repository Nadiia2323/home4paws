// import React, { useState, useEffect } from "react";

// function FetchData() {
//     const [someData, setSomeData] = useState(null);

//     const url = "https://api.petfinder.com/v2/animals";

//     const fetchData = () => {
//         const options = {
//             headers: {
//                 Authorization:
//                     "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI4Y2hXc1fMpmCl55E_neQtwps8B-mQk73-KCCvWLZzVy-BNyHIivCVNPw5Ec8bgvuSVmCBQXPdmdzn5Y5Qp0mL2Tb6Ug2CNspnOJHF_fsNt2zUIn9KAlQNqPOaJya7CTGyjB9icDDuEnkD0TD0H6fzpIi05NDhEw0QOApdJ8mmpAkpkp6D_pak4P0EPjVIZatkvIUApd_tXATjD8AcdVIiDdhocFRvD6-c7p2NMHWcF0E5iMdlmfJhC9RdWFp1qhPg6AiksLf5mCihb2GBT4QQrXOX7bXb2CqVIgvK5M3vDsFTChPhlw",
//             },
//         };
//         fetch(url, options)
//             .then((res) => res.json())
//             .then((data) => const myData = data; setSomeData(data));
//         console.log('data :>> ', data);
//     };

    
//     useEffect(() => {
//         fetchData();
//     }, []);

//     return (
//         <div>
//             {/* <p>{someData.name }</p> */}
            
//         </div>
//     );
// }

// export default FetchData;

import React, { useState, useEffect } from "react";

function FetchData() {
    const [someData, setSomeData] = useState(null);

    const url = "https://api.petfinder.com/v2/animals";

    const fetchData = () => {
        const options = {
            headers: {
                Authorization:
                    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI4Y2hXc1fMpmCl55E_neQtwps8B-mQk73-KCCvWLZzVy-BNyHIivCVNPw5Ec8bgvuSVmCBQXPdmdzn5Y5Qp0mL2Tb6Ug2CNspnOJHF_fsNt2zUIn9KAlQNqPOaJya7CTGyjB9icDDuEnkD0TD0H6fzpIi05NDhEw0QOApdJ8mmpAkpkp6D_pak4P0EPjVIZatkvIUApd_tXATjD8AcdVIiDdhocFRvD6-c7p2NMHWcF0E5iMdlmfJhC9RdWFp1qhPg6AiksLf5mCihb2GBT4QQrXOX7bXb2CqVIgvK5M3vDsFTChPhlw",
            },
        };
        fetch(url, options)
            .then((res) => res.json())
            .then((data) => {
                setSomeData(data); // Update the state with the fetched data
                console.log('data :>> ', data); // Log the data
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            {/* You can display the fetched data here */}
            {someData && <pre>{JSON.stringify(someData, null, 2)}</pre>}
        </div>
    );
}

export default FetchData;
