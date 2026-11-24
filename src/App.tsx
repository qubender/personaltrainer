import { useState, useEffect } from 'react'
import type { Customer } from "./Customer"
import './App.css'

function App() {
  const [customers, setCustomers] = useState<Customer[]>([])

  useEffect(() => {
    fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/")
        .then(response => response.json())
        .then(data => setCustomers(data))
        },[])

  return <CustomerTable customers={customers} />
}

export default App
