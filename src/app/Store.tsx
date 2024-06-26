import { configureStore } from '@reduxjs/toolkit'
import TicketSlic from "./Slice/TicketSlice"

export const store = configureStore({
  reducer: {
    ticket:TicketSlic,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch