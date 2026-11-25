import { useState, useEffect } from 'react'
import type { Customer } from "./Customer"
import type { Training } from './Training.tsx'
import CustomerTable from "./CustomerTable.tsx"
import TrainingTable from './TrainingTable.tsx'
import './App.css'
import { Container } from '@mui/material'

function App() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [trainings, setTrainings] = useState<Training[]>([])

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
  
  useEffect(() => {
    fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/")
        .then(response => response.json())
        .then(data => fetch(data._links.trainings.href))
        .then(response => response.json())
        .then(data => {
            console.log("Trainings:", data)
            setTrainings(data._embedded.trainings)
        })
        .catch(error => console.error("Fetch error:", error))
  })
  return (
  <Container maxWidth="xl">
    <CustomerTable customers={customers} />
    <TrainingTable 
        trainings={trainings}
        customers={customers} />
  </Container>
)
}

export default App
