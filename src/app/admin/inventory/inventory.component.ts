import { Component, OnInit } from "@angular/core"
import { CommonModule  } from "@angular/common"
import { FormsModule } from '@angular/forms';




interface InventoryItem {
  id: number
  name: string
  category: string
  subcategory: string
  sku: string
  price: number
  salePrice: number | null
  stock: number
  lowStockThreshold: number
  manufacturer: string
  image: string
  createdAt: string
  updatedAt: string
}

interface CategoryFilter {
  name: string
  value: string
  count: number
}

interface ManufacturerFilter {
  name: string
  value: string
  count: number
}

@Component({
  selector: "app-inventory",
  imports:[CommonModule,FormsModule],
  templateUrl: "./inventory.component.html",
  styleUrls: ["./inventory.component.css"],
})
export class InventoryComponent implements OnInit {
  inventoryItems: InventoryItem[] = []
  filteredItems: InventoryItem[] = []
  selectedItems: number[] = []

  // Pagination
  currentPage = 1
  itemsPerPage = 10
  totalItems = 0

  // Sorting
  sortField = "name"
  sortDirection = "asc"

  // Filters
  searchQuery = ""
  categoryFilters: CategoryFilter[] = []
  manufacturerFilters: ManufacturerFilter[] = []
  stockFilter = "all" // all, in-stock, low-stock, out-of-stock
  selectedCategories: string[] = []
  selectedManufacturers: string[] = []

  // Selected item for detail view
  selectedItem: InventoryItem | null = null

  // Edit mode
  editMode = false

  // Bulk actions
  showBulkActions = false

  constructor() {}

  ngOnInit(): void {
    this.loadInventoryItems()
    this.initializeFilters()
  }

  loadInventoryItems(): void {
    // Mock data for inventory items
    this.inventoryItems = [
      {
        id: 1,
        name: "Brake Pads - Front",
        category: "Brake System",
        subcategory: "Brake Pads",
        sku: "BP-10025",
        price: 85.99,
        salePrice: 75.99,
        stock: 120,
        lowStockThreshold: 30,
        manufacturer: "Bosch",
        image: "assets/images/products/brake-pads.jpg",
        createdAt: "2023-01-15",
        updatedAt: "2023-04-20",
      },
      {
        id: 2,
        name: "Oil Filter - Standard",
        category: "Engine",
        subcategory: "Filters",
        sku: "OF-20045",
        price: 24.99,
        salePrice: null,
        stock: 85,
        lowStockThreshold: 25,
        manufacturer: "Mann",
        image: "assets/images/products/oil-filter.jpg",
        createdAt: "2023-01-20",
        updatedAt: "2023-04-18",
      },
      {
        id: 3,
        name: "Spark Plugs - Iridium",
        category: "Engine",
        subcategory: "Ignition",
        sku: "SP-30078",
        price: 14.99,
        salePrice: null,
        stock: 200,
        lowStockThreshold: 50,
        manufacturer: "NGK",
        image: "assets/images/products/spark-plug.jpg",
        createdAt: "2023-02-05",
        updatedAt: "2023-04-25",
      },
      {
        id: 4,
        name: "Air Filter - Performance",
        category: "Engine",
        subcategory: "Filters",
        sku: "AF-40112",
        price: 34.99,
        salePrice: 29.99,
        stock: 75,
        lowStockThreshold: 20,
        manufacturer: "K&N",
        image: "assets/images/products/air-filter.jpg",
        createdAt: "2023-02-10",
        updatedAt: "2023-04-15",
      },
      {
        id: 5,
        name: "Wiper Blades - Premium",
        category: "Exterior",
        subcategory: "Wiper Blades",
        sku: "WB-50098",
        price: 45.99,
        salePrice: 39.99,
        stock: 90,
        lowStockThreshold: 25,
        manufacturer: "Bosch",
        image: "assets/images/products/wiper-blades.jpg",
        createdAt: "2023-02-15",
        updatedAt: "2023-04-10",
      },
      {
        id: 6,
        name: "Engine Oil - Synthetic 5W-30",
        category: "Fluids",
        subcategory: "Engine Oil",
        sku: "EO-60135",
        price: 49.99,
        salePrice: null,
        stock: 150,
        lowStockThreshold: 30,
        manufacturer: "Mobil",
        image: "assets/images/products/engine-oil.jpg",
        createdAt: "2023-02-20",
        updatedAt: "2023-04-05",
      },
      {
        id: 7,
        name: "Brake Disc - Vented",
        category: "Brake System",
        subcategory: "Brake Discs",
        sku: "BD-70088",
        price: 125.99,
        salePrice: null,
        stock: 60,
        lowStockThreshold: 15,
        manufacturer: "Brembo",
        image: "assets/images/products/brake-disc.jpg",
        createdAt: "2023-03-01",
        updatedAt: "2023-04-28",
      },
      {
        id: 8,
        name: "Transmission Fluid - Automatic",
        category: "Fluids",
        subcategory: "Transmission Fluid",
        sku: "TF-80075",
        price: 29.99,
        salePrice: 24.99,
        stock: 80,
        lowStockThreshold: 20,
        manufacturer: "Castrol",
        image: "assets/images/products/transmission-fluid.jpg",
        createdAt: "2023-03-05",
        updatedAt: "2023-04-12",
      },
      {
        id: 9,
        name: "Battery - Heavy Duty",
        category: "Electrical",
        subcategory: "Batteries",
        sku: "BT-90124",
        price: 159.99,
        salePrice: null,
        stock: 40,
        lowStockThreshold: 10,
        manufacturer: "Optima",
        image: "assets/images/products/battery.jpg",
        createdAt: "2023-03-10",
        updatedAt: "2023-04-22",
      },
      {
        id: 10,
        name: "Cabin Air Filter",
        category: "Interior",
        subcategory: "Filters",
        sku: "CF-10050",
        price: 19.99,
        salePrice: null,
        stock: 110,
        lowStockThreshold: 25,
        manufacturer: "Mann",
        image: "assets/images/products/cabin-filter.jpg",
        createdAt: "2023-03-15",
        updatedAt: "2023-04-08",
      },
    ]

    this.applyFilters()
  }

  initializeFilters(): void {
    // Extract unique categories and count
    const categoryCounts: { [key: string]: number } = {}
    this.inventoryItems.forEach((item) => {
      if (categoryCounts[item.category]) {
        categoryCounts[item.category]++
      } else {
        categoryCounts[item.category] = 1
      }
    })

    this.categoryFilters = Object.keys(categoryCounts).map((category) => ({
      name: category,
      value: category.toLowerCase().replace(/\s+/g, "-"),
      count: categoryCounts[category],
    }))

    // Extract unique manufacturers and count
    const manufacturerCounts: { [key: string]: number } = {}
    this.inventoryItems.forEach((item) => {
      if (manufacturerCounts[item.manufacturer]) {
        manufacturerCounts[item.manufacturer]++
      } else {
        manufacturerCounts[item.manufacturer] = 1
      }
    })

    this.manufacturerFilters = Object.keys(manufacturerCounts).map((manufacturer) => ({
      name: manufacturer,
      value: manufacturer.toLowerCase().replace(/\s+/g, "-"),
      count: manufacturerCounts[manufacturer],
    }))
  }

  applyFilters(): void {
    let filtered = this.inventoryItems

    // Apply search query
    if (this.searchQuery) {
      const search = this.searchQuery.toLowerCase()
      filtered = filtered.filter(
        (item) => item.name.toLowerCase().includes(search) || item.sku.toLowerCase().includes(search),
      )
    }

    // Apply category filters
    if (this.selectedCategories.length > 0) {
      filtered = filtered.filter((item) => this.selectedCategories.includes(item.category))
    }

    // Apply manufacturer filters
    if (this.selectedManufacturers.length > 0) {
      filtered = filtered.filter((item) => this.selectedManufacturers.includes(item.manufacturer))
    }

    // Apply stock filter
    if (this.stockFilter !== "all") {
      if (this.stockFilter === "in-stock") {
        filtered = filtered.filter((item) => item.stock > 0)
      } else if (this.stockFilter === "low-stock") {
        filtered = filtered.filter((item) => item.stock <= item.lowStockThreshold && item.stock > 0)
      } else if (this.stockFilter === "out-of-stock") {
        filtered = filtered.filter((item) => item.stock === 0)
      }
    }

    // Apply sorting
    filtered = this.sortItems(filtered)

    this.totalItems = filtered.length
    this.filteredItems = filtered
  }

  sortItems(items: InventoryItem[]): InventoryItem[] {
    return items.sort((a, b) => {
      let aValue: any = a[this.sortField as keyof InventoryItem]
      let bValue: any = b[this.sortField as keyof InventoryItem]

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (aValue === bValue) {
        return 0
      }

      if (this.sortDirection === "asc") {
        return aValue < bValue ? -1 : 1
      } else {
        return aValue > bValue ? -1 : 1
      }
    })
  }

  onSearch(): void {
    this.currentPage = 1
    this.applyFilters()
  }

  onCategoryChange(category: string, event: any): void {
    if (event.target.checked) {
      this.selectedCategories.push(category)
    } else {
      this.selectedCategories = this.selectedCategories.filter((c) => c !== category)
    }

    this.currentPage = 1
    this.applyFilters()
  }

  onManufacturerChange(manufacturer: string, event: any): void {
    if (event.target.checked) {
      this.selectedManufacturers.push(manufacturer)
    } else {
      this.selectedManufacturers = this.selectedManufacturers.filter((m) => m !== manufacturer)
    }

    this.currentPage = 1
    this.applyFilters()
  }

  onStockFilterChange(value: string): void {
    this.stockFilter = value
    this.currentPage = 1
    this.applyFilters()
  }

  onSortChange(field: string): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc"
    } else {
      this.sortField = field
      this.sortDirection = "asc"
    }

    this.applyFilters()
  }

  onPageChange(page: number): void {
    this.currentPage = page
  }

  clearFilters(): void {
    this.searchQuery = ""
    this.selectedCategories = []
    this.selectedManufacturers = []
    this.stockFilter = "all"
    this.currentPage = 1
    this.applyFilters()
  }

  toggleItemSelection(id: number, event: any): void {
    if (event.target.checked) {
      this.selectedItems.push(id)
    } else {
      this.selectedItems = this.selectedItems.filter((item) => item !== id)
    }

    this.showBulkActions = this.selectedItems.length > 0
  }

  selectAllItems(event: any): void {
    if (event.target.checked) {
      this.selectedItems = this.filteredItems.map((item) => item.id)
    } else {
      this.selectedItems = []
    }

    this.showBulkActions = this.selectedItems.length > 0
  }

  viewItemDetails(item: InventoryItem): void {
    this.selectedItem = item
    this.editMode = false
  }

  closeItemDetails(): void {
    this.selectedItem = null
    this.editMode = false
  }

  editItem(item: InventoryItem): void {
    this.selectedItem = { ...item }
    this.editMode = true
  }

  saveItem(): void {
    if (this.selectedItem) {
      const index = this.inventoryItems.findIndex((item) => item.id === this.selectedItem!.id)
      if (index !== -1) {
        this.inventoryItems[index] = { ...this.selectedItem }
        this.applyFilters()
        this.closeItemDetails()
      }
    }
  }

  deleteItem(id: number): void {
    this.inventoryItems = this.inventoryItems.filter((item) => item.id !== id)
    this.applyFilters()
    this.closeItemDetails()
  }

  bulkDelete(): void {
    this.inventoryItems = this.inventoryItems.filter((item) => !this.selectedItems.includes(item.id))
    this.selectedItems = []
    this.showBulkActions = false
    this.applyFilters()
  }

  bulkUpdateStock(): void {
    // Logic to update stock of selected items
    this.selectedItems = []
    this.showBulkActions = false
    this.applyFilters()
  }

  addNewItem(): void {
    // Logic to add a new item
  }

  getStockStatus(item: InventoryItem): string {
    if (item.stock === 0) {
      return "out-of-stock"
    } else if (item.stock <= item.lowStockThreshold) {
      return "low-stock"
    } else {
      return "in-stock"
    }
  }

  getPaginatedItems(): InventoryItem[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage
    return this.filteredItems.slice(startIndex, startIndex + this.itemsPerPage)
  }

  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage)
  }

  getPages(): number[] {
    const totalPages = this.getTotalPages()
    const displayPages = 5
    const pages: number[] = []

    if (totalPages <= displayPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      let startPage = Math.max(1, this.currentPage - Math.floor(displayPages / 2))
      let endPage = startPage + displayPages - 1

      if (endPage > totalPages) {
        endPage = totalPages
        startPage = Math.max(1, endPage - displayPages + 1)
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }
    }

    return pages
  }
}
