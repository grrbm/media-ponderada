import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  productsList: {
      marginTop: 20
  }
}));

export default function FormPropsTextFields({average, setAverage}) {
  const classes = useStyles();
  const [products, setProducts] = useState([]);

  function addProduct(){
    const productName = document.querySelector('#name-input').value;
    const productPrice = document.querySelector('#price-input').value;
    let currentProduct = products.filter((product)=> product.productName === productName)[0];
    if (currentProduct && currentProduct.productPrice !== productPrice){
        return Swal.fire("Não pode alterar o preço do produto.");
    }
    setProducts([...products,{productName, productPrice}]);
  }
  useEffect(()=>{
      console.log("products list: "+JSON.stringify(products));
      const map = new Map();
      let sumWeights = 0;
      let result = 0;
      for(let i=0;i<products.length;i++){
        map.set(products[i].productName,map.get(products[i].productName)+1 || 1);
      }
      console.log("THIS IS THE MAP: ");
      console.log(map);

      for (let key of map.keys()) {
        let amount = map.get(key);
        let price = products.filter((product)=> product.productName === key)[0].productPrice;
        let term = amount * price;
        console.log("term = "+amount+" x "+price);
        sumWeights = sumWeights + Number(price);
        result+=term;
      }
      console.log("sum weights = "+sumWeights);
      let avg = result/sumWeights;
      if (avg!== 0 && !avg) { return 0; } //check if avg equals NaN
      setAverage(avg);

  },[products])
  return (
    <form className={classes.root} noValidate autoComplete="off">
        <TextField 
            required 
            id="name-input" 
            label="Required" 
        />
        <TextField
          id="price-input"
          label="Price"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button onClick={()=>{addProduct()}} variant="contained" color="primary">
            Add Product
        </Button>
        <div className={classes.productsList}>
            {products.map((product)=><div>Product: {product.productName} - R$ {product.productPrice}</div>)}
        </div>
    </form>
  );
}