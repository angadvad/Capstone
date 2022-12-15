import React, { createContext } from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid,GridToolbar} from '@mui/x-data-grid';


function ParkingTable() {

    const [tableData, setTableData] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:5000/carpark/`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
            .then((data) => {setTableData(data.data);})
    }, []);


    const columns = [
        { field: 'parking_space', headerName: 'Parking Space', width: 130, },
        { field: 'number_plate', headerName: 'Number Plate', width: 130, },
        { field: 'user_id', headerName: 'User ID', width: 150, },
    ];

    const rows = tableData.filter((item)=>{
        return item.number_plate != "";
    })


    return (
        <div style={{ height: 400, width: '35%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                components={{
                    Toolbar: GridToolbar
                }}
                
            />
        </div>
    );
}


const ParkingList = () => {
    return (
        <div className="h-1/2 mt-20 w-full flex flex-col justify-center items-center">
            <ParkingTable></ParkingTable>
        </div>
    );
}

export default ParkingList;


