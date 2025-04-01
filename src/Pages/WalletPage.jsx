import { useState } from "react"
import { Search, ChevronRight, Plus, Minus, CreditCard, RefreshCw, Briefcase, FilterIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import DashboardLayout from "@/components/Dashboard/DashboardLayout"
import Table from "@/components/CustomTable"
import FundWalletModal from "@/components/Modals.jsx/FundWalletModal"
import { Toaster } from "sonner"
import CardFundingModal from "@/components/Modals.jsx/CardFundingModal"
import ConvertPointsModal from "@/components/Modals.jsx/ConvertPointsModal"
import WithdrawModal from "@/components/Modals.jsx/Withdrawal/WithdrawModal"

// Sample transaction data
const transactionsData = [
  {
    id: 1,
    name: "Point Conversion",
    icon: <RefreshCw className="h-5 w-5 text-primary" />,
    description: "Description",
    date: "22-01-2024",
    amount: "N3,500.00",
    type: "conversion",
  },
  {
    id: 2,
    name: "Wallet Top up",
    icon: <CreditCard className="h-5 w-5 text-primary" />,
    description: "Description",
    date: "22-01-2024",
    amount: "N3,500.00",
    type: "topup",
  },
  {
    id: 3,
    name: "Withdrawal",
    icon: <Minus className="h-5 w-5 text-destructive" />,
    description: "Description",
    date: "22-01-2024",
    amount: "N3,500.00",
    type: "withdrawal",
  },
  {
    id: 4,
    name: "Earning from gig",
    icon: <Briefcase className="h-5 w-5 text-primary" />,
    description: "Gig ID #1000",
    date: "22-01-2024",
    amount: "N3,500.00",
    type: "earning",
  },
]

function Wallet() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" })
  const [isFundWalletModalOpen, setIsFundWalletModalOpen] = useState(false)
  const [isCardFundingModalOpen, setIsCardFundingModalOpen] = useState(false)
  const [activePaymentMethod, setActivePaymentMethod] = useState(null)
  const [isConvertPointsModalOpen, setIsConvertPointsModalOpen] = useState(false)
  const [pointsBalance, setPointsBalance] = useState(1200)
  const [walletBalance, setWalletBalance] = useState(200000000)
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false)

  // Table columns definition
  const columns = [
    { key: "name", label: "Course Name" },
    { key: "date", label: "Date" },
    { key: "amount", label: "Amount" },
  ]

  // Custom cell renderer for the table
  const renderCustomCell = (key, value, row) => {
    if (key === "name") {
      return (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-gray-100 rounded-lg flex items-center justify-center">{row.icon}</div>
          <div>
            <p className="font-medium">{row.name}</p>
            <p className="text-sm text-muted-foreground">{row.description}</p>
          </div>
        </div>
      )
    }
    return value
  }

  const handleAddMoney = () => {
    setIsCardFundingModalOpen(true)
  }

  const handleWithdraw = () => {
    setIsWithdrawModalOpen(true)
  }

  const handleMethodSelect = (methodId) => {
    setActivePaymentMethod(methodId)
    if (methodId === "bank") {
      setIsCardFundingModalOpen(false)
      setIsFundWalletModalOpen(true)
    }
  }

  const handleConvertPoints = () => {
    setIsConvertPointsModalOpen(true)
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Wallet</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-8">
            {/* Wallet Balance */}
            <div className="bg-indigo-50 rounded-lg p-6 space-y-4">
              <p className="text-gray-600 text-center">Wallet Balance</p>
              <h2 className="text-3xl font-bold text-center">
              NGN {walletBalance.toLocaleString()}<span className="text-xl">.00</span>
              </h2>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <Button className="bg-black hover:bg-black/90" onClick={handleAddMoney}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Money
                </Button>
                <Button variant="outline" className="border-gray-300" onClick={handleWithdraw}>
                  <Minus className="h-4 w-4 mr-2" />
                  Withdraw
                </Button>
              </div>
            </div>

            {/* Point Balance */}
            <div className="border rounded-lg p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600 text-sm">Point Balance</p>
                  <h3 className="text-2xl font-bold">{pointsBalance}pt</h3>
                </div>
                <Button 
                variant="outline" 
                size="sm" 
                className="rounded-full"
                onClick={handleConvertPoints}
                disabled={pointsBalance <= 0}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Convert
                </Button>
              </div>
            </div>

            {/* Cards */}
            <div className="border rounded-lg p-6">
              <h3 className="text-gray-600 mb-4">Cards</h3>

              <div className="space-y-4">
                {/* Mastercard */}
                <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="flex">
                      <div className="h-8 w-8 bg-red-500 rounded-full opacity-70"></div>
                      <div className="h-8 w-8 bg-yellow-500 rounded-full -ml-4 opacity-70"></div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">Mastercard</p>
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">DEFAULT</span>
                      </div>
                      <p className="text-sm text-gray-500">Debit •••• 0000</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>

                {/* Visacard */}
                <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      V
                    </div>
                    <div>
                      <p className="font-medium">Visacard</p>
                      <p className="text-sm text-gray-500">Debit •••• 0000</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Transactions */}
          <div className="lg:col-span-2">
            <div className="border rounded-lg p-4 md:p-6">
              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search"
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="md:ml-2 whitespace-nowrap">
                  <FilterIcon className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>

              {/* Transactions Table */}
              <Table
                data={transactionsData}
                columns={columns}
                renderCustomCell={renderCustomCell}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                sortConfig={sortConfig}
                onSort={(key) => {
                  setSortConfig((prevConfig) => ({
                    key,
                    direction: prevConfig.key === key && prevConfig.direction === "asc" ? "desc" : "asc",
                  }))
                }}
                showDelete={false}
              />
            </div>
          </div>
        </div>
        {/* Fund Wallet Modal */}
        <FundWalletModal isOpen={isFundWalletModalOpen} onClose={() => setIsFundWalletModalOpen(false)} />

         {/* Card Funding Modal */}
         <CardFundingModal isOpen={isCardFundingModalOpen} onClose={() => setIsCardFundingModalOpen(false)} />

        {/* Convert Points Modal */}
        <ConvertPointsModal
          isOpen={isConvertPointsModalOpen}
          onClose={() => setIsConvertPointsModalOpen(false)}
          availablePoints={pointsBalance}
        />

        {/* Withdraw Modal */}
        <WithdrawModal
          isOpen={isWithdrawModalOpen}
          onClose={() => setIsWithdrawModalOpen(false)}
          walletBalance={walletBalance}
        />

        {/* Toast notifications */}
        <Toaster />
      </div>
    </DashboardLayout>
  )
}

export default Wallet