import Layout from "../components/Layout"
import css from "../styles/Cart.module.css"
import { useStore } from "../store/store"
import Image from "next/image"
import { useRouter } from 'next/router'
import { urlFor } from "../lib/client"
import React, { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import OrderModal from "../components/OrderModal"



export default function Cart() {

    const [PaymentMethod, setPaymentMethod] = useState(null)
    const [Order, setOrder] = useState(
        typeof window !== 'undefined' && localStorage.getItem('order')
    )
    const removePizza = useStore((state) => state.removePizza)
    const cartData = useStore((state) => state.cart)
    const router = useRouter();

    const handelRemove = (i) => {
        removePizza(i)
        toast.error('Item Removed')
    }

    const total = () => cartData.pizzas.reduce((a, b) => a + b.quantity * b.price, 0)

    const hanledOndelivery = () => {
        setPaymentMethod(0);
        typeof window !== 'undefined' && localStorage.setItem('total', total())
    }

    const hanledCkechout = async () => {
        typeof window !== 'undefined' && localStorage.setItem('total', total())
        setPaymentMethod(1);

        const response = await fetch('/api/stripe', {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(cartData.pizzas),
        });

        if (response.status === 5000) return;
        const data = await response.json();
        toast.loading("Redirecting...");
        router.push(data.url)
    }


    return (
        <Layout>

            <div className={css.container}>

                {/*details  */}
                <div className={css.details}>
                    <table className={css.table}>
                        <thead>
                            <th>Pizza</th>
                            <th>Name</th>
                            <th>Size</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th></th>
                        </thead>
                        <tbody className={css.tbody}>
                            {
                                cartData.pizzas.length > 0 &&
                                cartData.pizzas.map((pizza, i) => {
                                    const src = urlFor(pizza.image).url()
                                    return (
                                        <tr key={i}>
                                            <td className={css.imageTd}>
                                                <Image
                                                    loader={() => src}
                                                    src={src}
                                                    alt=""
                                                    objectFit="cover"
                                                    width={85}
                                                    height={85}
                                                />
                                            </td>
                                            <td>{pizza.name}</td>
                                            <td>
                                                {
                                                    pizza.size === 0 ?
                                                        "Small" :
                                                        pizza.size === 1 ?
                                                            "Medium" :
                                                            "Large"
                                                }
                                            </td>
                                            <td>{pizza.price}</td>
                                            <td>{pizza.quantity}</td>
                                            <td>{pizza.price * pizza.quantity}</td>
                                            <td onClick={() => handelRemove(i)} style={{ color: "var(--themeRed", cursor: 'pointer' }}>x</td>
                                        </tr>
                                    )

                                })

                            }
                        </tbody>

                    </table>



                </div>
                <div className={css.cart}>
                    <span>Cart</span>
                    <div className={css.CartDetails}>
                        <div>
                            <span>Items</span>
                            <span>{cartData.pizzas.length}</span>
                        </div>
                        <div>
                            <span>Total</span>
                            <span>${total()}</span>
                        </div>
                    </div>
                    {!Order && cartData.pizzas.length > 0 ? (
                        <div className={css.buttons}>
                            <button className="btn" onClick={hanledOndelivery}>Pay on Delivery</button>
                            <button className="btn" onClick={hanledCkechout} >Pay Now</button>
                        </div>
                    ) : null

                    }




                </div>
            </div>
            <Toaster />

            {/* Modal */}

            <OrderModal
                opened={PaymentMethod === 0}
                setOpened={setPaymentMethod}
                PaymentMethod={PaymentMethod}

            />



        </Layout>

    )

}
