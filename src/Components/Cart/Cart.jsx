import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { productContext } from '../../Contexts/ProductsContext';
import { Button, Typography } from '@mui/material';
import { calcTotalPrice } from '../../Helpers/CalcPrice';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];



export default function Cart() {

    const { cart, getCart, changeProductCount} = React.useContext(productContext)
    React.useEffect(()=>{
        getCart()
    }, [])


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Image</StyledTableCell>
            <StyledTableCell align="right">Title</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Count</StyledTableCell>
            <StyledTableCell align="right">SubPrice</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {cart.products? (
                <>
                    {cart.products.map((elem) => (
                        <StyledTableRow key={elem.item.id}>
                        <StyledTableCell component="th" scope="row">
                            <img width='30px' src={elem.item.image} alt={elem.item.title} />
                        </StyledTableCell>
                        <StyledTableCell align="right">{elem.item.title}</StyledTableCell>
                        <StyledTableCell align="right">{elem.item.price}</StyledTableCell>
                        <StyledTableCell align="right">
                            <input 
                            type="number" 
                            value={elem.count}
                            min='0'
                            onChange={(e) => changeProductCount(e.target.value, elem.item.id)} />
                        </StyledTableCell>
                        <StyledTableCell align="right">{elem.subPrice}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </>
            ): (
                <TableRow>
                    <TableCell>
                        <h1>Loading...</h1>
                    </TableCell>
                </TableRow>
                )}
            <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>
                    <Typography variant='h5'>Total:</Typography>
                </TableCell>
                {
                    cart.products ? (
                        <TableCell align='right'>
                            <Typography variant='h5'>
                                {calcTotalPrice(cart.products)}
                            </Typography>
                        </TableCell>
                    ): (null)
                }
            </TableRow>
            <TableRow>
                <TableCell colSpan={3} align='right'>
                    <Button variant='contained' color='primary'>
                        BUY
                    </Button>
                </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
