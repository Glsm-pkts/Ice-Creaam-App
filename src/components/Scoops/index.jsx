import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from '../Card';

const Scoops = () => {
const [data, setData] =useState([]);
const [basket, setBasket] = useState([]);

useEffect(() => {
axios.get("http://localhost:4090/scoops").then((res) => setData(res.data));
}, []);

//! sepete ekle 
const addToBasket = (item) => {
  // sepette bu elemandan var mı ?
  const found = basket.find((i) => i.id === item.id);

if(found){
  // güncel nesneyi oluştur
  const updated = {...found, amount: found.amount + 1}

  //varsa miktarını arttır
  const temp = basket.map((i) => (i.id === found.id ? updated : i))

  //stati güncelle
  setBasket(temp);

} else{
  //yoksa sepete ekle
  setBasket([...basket, {...item, amount: 1}])
}
};

//! sepetten çıkar

const removeFromBasket = (id) =>{
  
    // sepette bu elemandan var mı ?
    const found = basket.find((i) => i.id === id);
  
  if(found.amount > 1){
    // güncel nesneyi oluştur
    const updated = {...found, amount: found.amount -1}
  
    //dizideki elemanı güncelle
    const temp = basket.map((i) => (i.id === found.id ? updated : i))
  
    //stati güncelle
    setBasket(temp);
  
  } else{
    //yoksa sepetten kaldır
    setBasket(basket.filter((i) => i.id !== id));
  }
  };

  //toplam fiyatı hesapla
  const total = basket.reduce((total,i) => total + i.amount * 20,0)

  return (
    <div>
      <h1>Dondurma Çeşitleri</h1>

      <p>Tanesi: <span className='text-success p-0'>20</span>₺</p>

      <h3>
        Çeşitler Ücreti:{" "} <span data-testid="total" className='text-success p-0'>{total}</span>₺
      </h3>
      <div className='p-3 row gap-5 mt-4 justify-content-between'>
      {data.map((i) => {
          // ekrana baılcak elemanı sepette bul
          const found = basket.find((item) => item.id === i.id);

          return (
            <Card
              amount={found?.amount || 0}
              addToBasket={addToBasket}
              removeFromBasket={removeFromBasket}
              item={i}
              key={i.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Scoops;
