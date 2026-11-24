import { useState, useEffect } from 'react'
import type { Customer } from "./Customer"
import CustomerTable from "./CustomerTable.tsx"
import './App.css'
import { Container } from '@mui/material'

function App() {
  const [customers, setCustomers] = useState<Customer[]>([])

  useEffect(() => {
    fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/")
        .then(response => response.json())
        .then(data => fetch(data._links.customers.href))
        .then(response => response.json())
        .then(data => {
            console.log("Customers:", data)
            setCustomers(data._embedded.customers)
        })
        .catch(error => console.error("Fetch error:", error))
      }, [])
  
  return (
  <Container maxWidth="xl">
    <CustomerTable customers={customers} />
  </Container>
)
}

export default App
