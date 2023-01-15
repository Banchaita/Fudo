import { useState } from 'react'
import Layout from '../../components/Layout'
import { client, urlFor } from '../../lib/client'
import Image from 'next/image'
import LeftArrow from '../../assets/arrowLeft.png'
import RightArrow from '../../assets/arrowRight.png'
import css from '../../styles/Pizza.module.css'
import { useStore } from '../../store/store'
import toast,{ Toaster } from 'react-hot-toast'

export default function Pizza({ pizza }) {
    
    const src = urlFor(pizza.image).url()

    const [size, setSize] = useState(1)
    const [quantity, setQuantity] = useState(1)


    const handleQuantity = (type) => {
        type === 'inc' ? setQuantity((prev) => prev + 1) :
            quantity === 1 ? null : setQuantity((prev) => prev - 1);

    }


    // add to cart function
    const addPizza = useStore((state)=>state?.addPizza)
    const addToCart = () =>{
        addPizza({...pizza, price:pizza.price[size], quantity:quantity,size:size})
        toast.success("Added to Cart")
    }


    return (
        <Layout>
            <div className={css.container}>
                <div className={css.imageWrapper}>
                    <Image loader={() => src} src={src} layout='fill' unoptimized objectFit='cover' />
                </div>
                {/* rightside */}
                <div className={css.right}>
                    <span>{pizza.name}</span>
                    <span>{pizza.details}</span>

                    <span>
                        <span style={{ color: "var(--themeRed)" }}>$</span>
                        {pizza.price[size]}
                    </span>
                    <div className={css.size}>
                        <span>Size</span>
                        <div className={css.SizeVaraints}>
                            <div onClick={() => setSize(0)} className={size === 0 ? css.selected : ""}>Small</div>
                            <div onClick={() => setSize(1)} className={size === 1 ? css.selected : ""}>Medium</div>
                            <div onClick={() => setSize(2)} className={size === 2 ? css.selected : ""}>Large</div>
                        </div>
                    </div>

                    {/* Quantity counter */}
                    <div className={css.quantity}>
                        <sapn>Quantity</sapn>

                        <div className={css.counter}>
                            <Image src={LeftArrow} onClick={()=>handleQuantity("dec")} width={20} height={20} alt="" objectFit='contain' style={{cursor:'pointer'}} />
                            <span>{quantity}</span>
                            <Image src={RightArrow} onClick={()=>handleQuantity("inc")} width={20} height={20} alt="" objectFit='contain' style={{cursor:'pointer'}}/>
                        </div>
                    </div>

                    {/* Button */}
                    <div className={`btn ${css.btn}`} onClick={addToCart}>
                        Add to Cart
                    </div>
                </div>
                <Toaster/>


            </div>


        </Layout>
    )

}






export async function getStaticPaths() {
    const paths = await client.fetch(
        `*[_type == "pizza" && defined(slug.current)][].slug.current`
    );
    return {
        paths: paths.map((slug) => ({ params: { slug } })),
        fallback: true, // can also be true or 'blocking'
    }
}


export async function getStaticProps(context) {
    const { slug = "" } = context.params;
    const pizza = await client.fetch(
        `*[_type == "pizza" && slug.current == '${slug}'][0]`
    )
    return {
        // Passed to the page component as props
        props: { pizza, },
    }
}