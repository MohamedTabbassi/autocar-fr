import { Component, type OnInit } from "@angular/core"
import { Chart, registerables } from "chart.js"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

Chart.register(...registerables)

@Component({
  selector: "app-dashboard",
  imports:[CommonModule,FormsModule],
  templateUrl: "./dasshboard.component.html",
  styleUrls: ["./dasshboard.component.css"],
})
export class DashboardComponent implements OnInit {
  salesChart: any
  ordersChart: any
  bookingsChart: any

  // Mock data
  stats = {
    totalSales: 125850,
    totalOrders: 1458,
    totalBookings: 856,
    totalCustomers: 3254,
    pendingOrders: 24,
    pendingBookings: 18,
    lowStockItems: 12,
    recentActivity: [
      { id: 1, type: "order", user: "John Doe", action: "placed an order", amount: 350, time: "10 minutes ago" },
      { id: 2, type: "booking", user: "Sarah Smith", action: "booked a service", amount: 120, time: "25 minutes ago" },
      { id: 3, type: "return", user: "Mike Johnson", action: "requested a return", amount: 75, time: "1 hour ago" },
      { id: 4, type: "order", user: "Emily Brown", action: "placed an order", amount: 520, time: "2 hours ago" },
      { id: 5, type: "booking", user: "David Wilson", action: "booked a car rental", amount: 890, time: "3 hours ago" },
    ],
    topSellingProducts: [
      { id: 1, name: "Brake Pads", sales: 245, stock: 120, price: 85 },
      { id: 2, name: "Oil Filter", sales: 210, stock: 85, price: 25 },
      { id: 3, name: "Spark Plugs", sales: 185, stock: 200, price: 15 },
      { id: 4, name: "Air Filter", sales: 160, stock: 75, price: 35 },
      { id: 5, name: "Wiper Blades", sales: 145, stock: 90, price: 45 },
    ],
    upcomingBookings: [
      { id: 1, service: "Oil Change", customer: "John Doe", date: "2023-05-15 10:00", status: "confirmed" },
      { id: 2, service: "Brake Inspection", customer: "Sarah Smith", date: "2023-05-15 14:30", status: "pending" },
      { id: 3, service: "Car Rental", customer: "Mike Johnson", date: "2023-05-16 09:00", status: "confirmed" },
      { id: 4, service: "Tire Replacement", customer: "Emily Brown", date: "2023-05-16 13:00", status: "confirmed" },
      { id: 5, service: "Mobile Mechanic", customer: "David Wilson", date: "2023-05-17 11:30", status: "pending" },
    ],
  }

  constructor() {}

  ngOnInit(): void {
    this.initCharts()
  }

  initCharts(): void {
    // Sales Chart
    this.salesChart = new Chart("salesChart", {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: "Monthly Sales",
            data: [12500, 15000, 18000, 16500, 21000, 22500, 25000, 23000, 27000, 28500, 30000, 32000],
            borderColor: "#ff6b00",
            backgroundColor: "rgba(255, 107, 0, 0.1)",
            borderWidth: 2,
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    })

    // Orders Chart
    this.ordersChart = new Chart("ordersChart", {
      type: "bar",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: "Orders",
            data: [85, 100, 115, 105, 125, 130, 145, 135, 150, 155, 165, 175],
            backgroundColor: "#3498db",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    })

    // Bookings Chart
    this.bookingsChart = new Chart("bookingsChart", {
      type: "doughnut",
      data: {
        labels: ["Mechanic Service", "Mobile Mechanic", "Car Rental", "Other"],
        datasets: [
          {
            data: [45, 25, 20, 10],
            backgroundColor: ["#2ecc71", "#e74c3c", "#f39c12", "#9b59b6"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
        cutout: "70%",
      },
    })
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "status-confirmed"
      case "pending":
        return "status-pending"
      case "cancelled":
        return "status-cancelled"
      default:
        return ""
    }
  }
}
