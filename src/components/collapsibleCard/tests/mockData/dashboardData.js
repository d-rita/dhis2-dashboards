import { columnItemData, mapItemData, textItemData } from "./itemData"

export const singleDashboardInfo = {
  "displayName": "Test Dashboard",
  "id": "test-dashboard-1",
  "starred": true
}

export const mockedSingleDashboardItems = {
  "access": {
      "manage": true,
      "externalize": true,
      "write": true,
      "read": true,
      "update": true,
      "delete": true
  },
  "restrictFilters": false,
  "displayName": "Test Dashboard",
  "id": "test-dashboard-1",
  "dashboardItems": [
    columnItemData,
    mapItemData,
    textItemData
  ],
  "starred": false
}
     