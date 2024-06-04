import { Box, IconButton, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from './theme';
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Delete } from '@mui/icons-material';
import Modal from '../Modal';
import { setModalStatus } from '../../store/slices/modalSlice';
import { useDispatch, useSelector } from 'react-redux';

const PreOrders = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const[title, setTitle] = useState("");
  const[content, setContent] = useState("");
  const[triggerSolutionId, setTriggerSolutionId] = useState("");
  const[trigger, setTrigger] = useState("");
  const[modalLoadingButton, setModalLoadinButton] = useState(false);
  const dispatch = useDispatch();
  const isGetPreOrder = useSelector((state)=>state.admin.isGetPreOrder);

  useEffect(()=>{
    getPreOrders();
  },[isGetPreOrder])

  

  const[preOrders, setPreOrders] = useState([]);

  const columns = [
    { 
    field: 'id',
    headerName: 'ID',
    flex: 0.4,
    headerAlign: 'center',
    align: 'center'
    },
    {
      field: 'userId',
      headerName: 'User Id',
      flex: 0.5,
      cellClassName: 'name-column--cell',
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'createDate',
      headerName: 'Create Date',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
    },
    {
      field: 'updateDate',
      headerName: 'Update Date',
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'isDelete',
      headerName: 'Is Delete',
      flex: 0.5,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.5,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {

        const handleDelete = () => {
            dispatch(setModalStatus(true));
            setTrigger('d');
            setTitle('Delete');
            setContent('İlgili ön siparişi silmek istediğinize emin misiniz ?');
            setTriggerSolutionId(params.row.id);
        };

        return (
          <div>
            <IconButton onClick={handleDelete} aria-label="delete">
              <Delete />
            </IconButton>
          </div>
        );
      }
    }
  ];



  const getPreOrders = async ()=>{

    try {
      const response = await axios.get("https://api.kadirsenol.com/api/admin/PreOrder/GetPreOrders",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }
    );
      if (response.status === 200 || response.status === 204 ) {
        setPreOrders(response.data)
      }else {
        toast.info(
          "An unexpected situation has occurred, please try again by checking your information."
        );
      }
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        toast.error("Could not connect to the server.");
      } else if (error.response.status === 500) {
        //Problem(), server side bissunes exceptions and all catch error
        toast.error(error.response.data.detail);
      }else if (error.response.status === 401) {
          toast.error("Please make a user login.");
          navigate("/Login"); 
      } else if (error.response.status === 400) {
        //BadRequest(), server side valid. Eger frontend validinden bir sekil kurtulursa back validi devreye girecek
        Object.values(error.response.data.errors).forEach((value) => {
          value.forEach((message) => {
            toast.error(message);
          });
        });
      } else {
        toast.error("Opps! An unexpected error has occurred.");
      }
    }        

  }

  const deletePreOrder = async (preorderid)=>{

    try {
      const response = await axios.post("https://api.kadirsenol.com/api/admin/PreOrder/DeletePreOrder",
      {Id : preorderid},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }
    );
      if (response.status === 200 || response.status === 204 ) {
        toast.success(response.data);
        await getPreOrders();
      }else {
        toast.info(
          "An unexpected situation has occurred, please try again by checking your information."
        );
      }
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        toast.error("Could not connect to the server.");
      } else if (error.response.status === 500) {
        //Problem(), server side bissunes exceptions and all catch error
        toast.error(error.response.data.detail);
      }else if (error.response.status === 401) {
          toast.error("Please make a user login.");
          navigate("/Login"); 
      } else if (error.response.status === 400) {
        //BadRequest(), server side valid. Eger frontend validinden bir sekil kurtulursa back validi devreye girecek
        Object.values(error.response.data.errors).forEach((value) => {
          value.forEach((message) => {
            toast.error(message);
          });
        });
      } else {
        toast.error("Opps! An unexpected error has occurred.");
      }
    }        
    dispatch(setModalStatus(false));
    setModalLoadinButton(false);
  }

  return (
    <Box m="15px">
      <div className='flex justify-center items-center font-bold text-2xl'>
            <span className='font-bold text-2xl p-0.5 rounded-md text-gray-700'>
             Pre Orders
            </span>
        </div>
      <Box
        m="30px 0 0 0"
        height="75vh"                
        sx={{
          borderRadius: '16px',
          overflow: 'hidden', 
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .name-column--cell': {
            color: colors.greenAccent[300],
          },
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: '#888888', // Alternatif kolon başlıkları için gri arka plan rengi            
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: '#666666',
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`,
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={preOrders}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          
        />
      </Box>
      <Modal
        title={title}
        clickYes={() => {
          if(trigger === 'd'){
            setModalLoadinButton(true);
            deletePreOrder(triggerSolutionId);
          }
        }}
        content={content}
        isYesNoButton={trigger === 'd' ? true : false}
        isLoadingButton={modalLoadingButton}
      />
    </Box>
  );
};

export default PreOrders;
