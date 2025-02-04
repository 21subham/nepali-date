import type React from "react"

interface TabButtonProps {
  setActiveTab: (tab: string) => void
  tab: string
  activeTab: string
  text: string
  isHoliday: boolean
}

const TabButton: React.FC<TabButtonProps> = ({
  setActiveTab,
  tab,
  activeTab,
  text
}) => (
  <button
    onClick={() => setActiveTab(tab)}
    className={`plasmo-px-4 plasmo-py-2 plasmo-rounded-md plasmo-text-sm plasmo-font-medium plasmo-transition-colors
      ${
        activeTab === tab
          ? "plasmo-bg-red-500 plasmo-text-white"
          : "plasmo-bg-red-100/50 plasmo-text-red-800 hover:plasmo-bg-red-200"
      }`}>
    {text}
  </button>
)

export default TabButton
