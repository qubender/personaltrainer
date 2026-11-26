import type { Customer } from "./Customer"

export interface Training {
    date: string
    duration: number
    activity: string
    customer?: Customer
    _links: {
        self: { href: string }
        training: { href: string }
        customer: { href: string }
    }
}