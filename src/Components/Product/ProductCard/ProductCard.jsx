import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
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
  console.log(currentUser);

  let icons = (
    <CardActions disableSpacing style={{display: 'flex', justifyContent:'space-between'}}>

      
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
    <Card sx={{ maxWidth: 420, maxHeight: 500 }}>
      <Link to={`/detail/${item.id}`} style={{textDecoration: 'none', color: 'black'}}>
        <CardMedia
          component="img"
          height="250"
          image={item.image}
          alt="18+"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
        </CardContent>
      </Link>
      <CardContent>
        <Typography size="small">${item.price}</Typography>
        {icons}
      </CardContent>
    </Card>
  );
}
