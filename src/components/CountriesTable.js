import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import { Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const CountriesTable = () => {
    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredCountries, setFilteredCountries] = useState([]);
    let [loading, setLoading] = useState(true);

    const getCountries = async () => {
        try {
            const response = await axios.get('https://restcountries.com/v2/all')
            setCountries(response.data);
            setFilteredCountries(response.data);
            setLoading(false);
        } catch (error) {
            console.log("error", error);
        }
    }

    const columns = [
        {
            name: "Country Name",
            sortable: true,
            selector: (row) => row.name
        },
        {
            name: "Country Native Name",
            sortable: true,
            selector: (row) => row.nativeName
        },
        {
            name: "Capital",
            sortable: true,
            selector: (row) => row.capital
        },
        {
            name: "Country Flag",
            selector: (row) => <img width={50} height={50} src={row.flag} alt="" />
        },
        {
            name: "Action",
            cell: (row) => <Button variant='contained' onClick={() => alert(row.alpha2Code)}>Edit</Button>
        }
    ]

    useEffect(() => {
        getCountries();
    }, [])

    useEffect(() => {
        const result = countries.filter(country => {
            return country.name.toLowerCase().match(search.toLowerCase());
        })
        setFilteredCountries(result);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])

    const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <DataTable
                columns={columns}
                data={filteredCountries}
                pagination
                title="Country List"
                fixedHeader
                fixedHeaderScrollHeight="370px"
                selectableRows
                selectableRowsHighlight
                highlightOnHover
                subHeader
                expandableRows
                expandableRowsComponent={ExpandedComponent}
                progressPending={loading}
                subHeaderComponent={
                    <>
                        <SearchIcon style={{ marginTop: '1.3%' }} />
                        <TextField
                            id="standard-basic"
                            label="Search Here"
                            variant="standard"
                            style={{ width: "25%" }}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </>
                }
            />
        </>
    )
}

export default CountriesTable
