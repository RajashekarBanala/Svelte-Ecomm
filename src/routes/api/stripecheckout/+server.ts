import type {RequestHandler} from  "./$types";
import Stripe from 'stripe';
const SECRET_STRIPE_KEY="sk_test_51OrZTRSDVB6DnlatoDnma2EhgDiQNy7tS1ad4pg8Tr2DpxfJA5BtvZjtTlds8m9V7QmsMETQOnoBFcOiu3Hm1e5B00IdUtBzLf";
const stripe=new Stripe(SECRET_STRIPE_KEY,{
    apiVersion:"2023-10-16"
});


export const POST:RequestHandler=async({request})=>{
    const data=await request.json();
    const items=data.items;
    let lineItems: any=[];
    items.forEach((item:any )=> {
        lineItems.push({price:item.id,quantity:item.quantity})
        
    });
    const session = await stripe.checkout.sessions.create({
        line_items:lineItems,
        mode:'payment',
        success_url:"http://localhost:5173/success",
        cancel_url:"http://localhost:5173/cancel",

    });

  return new Response(
    JSON.stringify({url:session.url}),
    {
        status:200,
        headers:{'content-type':'application/json'}
    }

  )

}