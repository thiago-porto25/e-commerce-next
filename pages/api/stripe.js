import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const params = {
        line_items: req.body.map((item) => {
          const img = item.image[0].asset._ref;
          const newImage = img
            .replace(
              'image-',
              'https://cdn.sanity.io/images/i52s84b4/production/'
            )
            .replace('-webp', '.webp');

          return {
            price_data: {
              currency: 'brl',
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        submit_type: 'pay',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [
          {
            shipping_rate: 'shr_1KvgpsIc9jUzlabsJEYLna76',
          },
          { shipping_rate: 'shr_1KvgqeIc9jUzlabscWWEq9Oh' },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      };

      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (error) {
      return res.status(500).json({ statusCode: 500, error: error.message });
    }
  }
}
