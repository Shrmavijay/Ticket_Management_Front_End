import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import environment from "../../Constant";

const baseURL = `${environment.baseUrl}`;

export interface ticketState {
  userId?: number;
  users: any[];
  authToken?: string;
  isLoading: boolean;
  ticket: any[];
  filteredTickets?: any[]
  error: string | null;
}

//Initial State

const initialState: ticketState = {
  isLoading:false,
  users:[],
  ticket: [],
  error: "",
};

// Create New Ticket
export const createTicket = createAsyncThunk(
  "ticket/create",
  async (ticketData: any) => {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `${baseURL}/api/tickets/create`,
      { ...ticketData },
      {
        headers: {
          authorization: token,
        },
      }
    );
    // console.log("create ticket response : ", res.data.data);
    return res.data.data;
  }
);

//changePassword

export const updatePass = createAsyncThunk('updatePassword',
  async (passwords: any) => {
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem('id')
    const oldPassword = passwords.currentPassword
    const newPassword = passwords.updatedPass
    // console.log(passwords)
    const res = await axios.put(
      `${baseURL}/api/users/${user_id}`,
      {oldPassword,newPassword},
      {
        headers: {
          authorization: token,
        },
      }
    );
    // console.log("axios response : ", res);
    return res;
})

// Fetch Tickets
export const getdata = createAsyncThunk("ticket", async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${baseURL}/api/tickets`, {
    headers: {
      authorization: token,
    },
  });
  // console.log(res.data);
  return res.data;
});

// Edit Ticket
export const editTicket = createAsyncThunk(
  "ticket/edit",
  async (ticketData: any) => {
    let rearragedList;
    if (Array.isArray(ticketData)) {
      rearragedList = JSON.parse(JSON.stringify(ticketData[1]));
      ticketData = ticketData[0];
    }
    const token = localStorage.getItem("token");
    const res = await axios.put(
      `${baseURL}/api/tickets/${ticketData.id}`,
      ticketData,
      {
        headers: {
          authorization: token,
        },
      }
    );
    // console.log("axios response : ", res.data.data);
    return rearragedList ? rearragedList : res.data.data;
  }
);

// Delete Ticket

export const deleteTicket = createAsyncThunk(
  "ticket/delete",
  async (ticketId: any) => {
    const token = localStorage.getItem("token");

    await axios.delete(`${baseURL}/api/tickets/${ticketId}`, {
      headers: {
        authorization: token,
      },
    });
    return ticketId;
  }
);

// User Login
export const loginUser = createAsyncThunk(
  "user/login",
  async (userData: any) => {
    const res = await axios.post(`${baseURL}/api/users/login`, userData);
    return res.data.data;
  }
);

// User Logout
export const logoutUser = createAsyncThunk("user/logout", async () => {
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem('id')
  await axios.delete(`${baseURL}/api/users/${user_id}`, {
    headers: {
      authorization: token,
    },
  });
});

// Ticket Slice
export const TicketSlic = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateTickets(state,{payload}){

      state.error = null;
        state.ticket = state.ticket?.map((ticket) =>
        ticket.id === payload.id ? payload : ticket
        )
      return state;
    },  
    filterTickets(state,action){
      state.filteredTickets = action.payload
      return state
    }
  },
  // toggleSelection(state:any,action: any){
    // state.users.map((user: any)=>{
    //   if(user.name == payload.name){
    //     user.isSelected = payload.isSelected
    //   }
    //   return user
    // })
    // return state
  // },



 // Extra reducers
  extraReducers(builder) {
    builder
      .addCase(loginUser.fulfilled, (state, { payload }: any) => {
        // console.log("login response data: ", payload);
        state.ticket = payload;
        return state;
      })
      .addCase(getdata.pending, (state)=>{
         state.isLoading = true
         return state
      })
      .addCase(getdata.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = null;
        state.ticket = action.payload.data;
        // state.users= action.payload.userName
        state.users = action.payload.userName.map((user: any)=>{
          return {...user,isSelected:false}
        })
        return state
      })

      .addCase(editTicket.fulfilled, (state, action: PayloadAction<any>) => {
        state.error = null;
        if (Array.isArray(action.payload)) {
          state.ticket = action.payload;
        } else {
          state.ticket = state.ticket?.map((ticket) =>
            ticket.id === action.payload.id ? action.payload : ticket
          );
        }
        return state;
      })
      .addCase(deleteTicket.fulfilled, (state, action: PayloadAction<any>) => {
        state.error = null;
        state.ticket = state.ticket?.filter(
          (ticket) => ticket.id !== action.payload
        );
        return state;
      })

      .addCase(createTicket.fulfilled, (state, action: PayloadAction<any>) => {
        state.error = null;
        state.ticket.push(action.payload);
        return state;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.ticket = [];
        return state;
      });
  },
});
export const { updateTickets, filterTickets } = TicketSlic.actions;

export default TicketSlic.reducer;
