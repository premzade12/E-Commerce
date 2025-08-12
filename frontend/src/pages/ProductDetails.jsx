import React, { useContext,useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'

function ProductDetails() {
    let {productId} = useParams()
    let {products, currency} = useContext(shopDataContext)

    const [productData, setProductData] = useState(false)
    const [image, setimage] = useState('')
    const [image1, setimage1] = useState('')
    const [image2, setimage2] = useState('')
    const [image3, setimage3] = useState('')
    const [image4, setimage4] = useState('')
    const [size, setSize] = useState('')

  const fetchProductData = async () => {
    products.map((item)=>{
        if(item._id===productId){
            setProductData(item)
            console.log(productData)
            setimage1(item.image1)
            setimage2(item.image2)
            setimage3(item.image3)
            setimage4(item.image4)
            setimage(item.image1)

            return null;
        }
    })
  }

  useEffect(() => {
    fetchProductData()
  }, [productId,products])
  
  
  return productData ? (
    <div>
      <div className='w-screen h-[130vh] md:h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-start flex-col lg:flex-row gap-[20px]'>
        <div className='lg:w-[50vw] md:w-[90vw] lg:h-[90vh] h-[50vh] mt-[70px] flex items-center justify-center md:gap-[10px] gap-[30px] flex-col-reverse lg:flex-row '>
            <div className='lg:w-[20%] md:w-[80%] h-[10%] lg:h-[80%] flex items-center justify-center gap-[50px] lg:gap-[20px] lg:flex-col flex-wrap'>
                <div className='md:w-[100px] w-[50px] h-[50px] md:h-[110px] bg-slate-300 border-[1px] border-[#80808049] rounded-md'>
                    <img src={image1} alt="" className='w-[100%] h-[100%] cursor-pointer rounded-md' onClick={()=>setimage(image1)}/>
                </div>
                <div className='md:w-[100px] w-[50px] h-[50px] md:h-[110px] bg-slate-300 border-[1px] border-[#80808049] rounded-md'>
                    <img src={image2} alt="" className='w-[100%] h-[100%] cursor-pointer rounded-md' onClick={()=>setimage(image2)}/>
                </div>
                <div className='md:w-[100px] w-[50px] h-[50px] md:h-[110px] bg-slate-300 border-[1px] border-[#80808049] rounded-md'>
                    <img src={image3} alt="" className='w-[100%] h-[100%] cursor-pointer rounded-md' onClick={()=>setimage(image3)}/>
                </div>
                <div className='md:w-[100px] w-[50px] h-[50px] md:h-[110px] bg-slate-300 border-[1px] border-[#80808049] rounded-md'>
                    <img src={image4} alt="" className='w-[100%] h-[100%] cursor-pointer rounded-md' onClick={()=>setimage(image4)}/>
                </div>

            </div>
                <div className='lg:w-[60%] w-[80%] lg:h-[78%] h-[70%] border-[1px] border-[#80808049] rounded-md overflow-hidden'>
                    <img src={image} alt="" className='w-[100%] lg:h-[100%] text-[30px] text-white text-center rounded-md object-fill'/>
                </div>
        </div>
        <div className='lg:w-[50vw] w-[100vw] lg:h-[75vh] h-[40vh] lg:mt-[80px] flex items-center justify-start flex-col py-[20px] px-[30px] md:pb-[20px] md:pl-[20px] lg:pl-[0px] lg:px-[0px] lg:py-[0px] gap-[10px]'>
            <h1 className='text-[40px] font-semibold text-[aliceblue]'>
                {}
            </h1>
        </div>
      </div>
    </div>
  ) : <div className='opacity-0'></div>
}

export default ProductDetails
