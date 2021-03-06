import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { productContext } from '../../../Contexts/ProductsContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';



export default function ProductCard({item}) {

  const {deleteProduct, addProductInCart, checkProductInCart, useAuth} = React.useContext(productContext)
  const currentUser = useAuth()

  let icons = (
    <CardActions disableSpacing style={{display: 'flex', justifyContent:'right'}}>

      
            {currentUser?.email === "admin@gmail.com" ? ( 
              <>
            <CardActions disableSpacing> 
            <Link to={`edit/${item.id}`}>  
              <IconButton> 
                <EditIcon/> 
             </IconButton> 
            </Link> 
            <IconButton onClick={() => deleteProduct(item.id)}> 
                <DeleteIcon/> 
             </IconButton>  
          </CardActions>
          </>
           
            ) : 
            <>
            <IconButton 
          aria-label='share'       
          onClick={() => addProductInCart(item)}
          color = {checkProductInCart(item.id) ? 'secondary' : 'inherit'}
          >
         <ShoppingCartIcon/>
         </IconButton>
         </>
       }
    </CardActions>
  )
  return (
    <Card sx={{ maxWidth: 400, maxHeight: 520 }} style={{margin:'10%', paddingBottom:'20px'}}>
      <Link to={`/detail/${item.id}`} style={{textDecoration: 'none', color: 'black'}}>
        <CardMedia
          component="img"
          sx={{objectFit:'scale-down'}}
          height='230'
          image={item.image}
          alt="18+"
          style={{marginTop:'20px'}}
        />
        <CardContent >
          <Typography  gutterBottom variant="h5" component="div" color='secondary' fontWeight='bold' align="center">
            {item.title}
          </Typography>
          <Typography marginBottom='7px' variant="body2" color="text.secondary" fontSize='16px' height='50px' align="center">
            {item.description}
          </Typography>
        </CardContent>
      </Link>
      <CardContent>
        <Typography marginTop='30px' fontSize="25px" align="center">${item.price}</Typography>
        {icons}
      </CardContent>
    </Card>
  );
}