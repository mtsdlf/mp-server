import express from "express"
import cors from "cors"

import {MercadoPagoConfig, preference} from "mercadopago"
const client = new MercadoPagoConfig({
    accessToken: "TEST-5856636980528286-021121-8fc2acdb93fca144c793698e6023fd4c-524393398"
})

const app = express()
const port = 3000

app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
    res.send("MP BACKEND")
})

app.post("/create_preference", async (req, res) => {
    try {
        const body = {
            items: [
                {
                    title: req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.price),
                    currency_id: "ARS"
                },
            ],
            back_urls: {
                success: "https://google.com",
                failure: "https://google.com",
                pending: "https://google.com"
            },
            auto_return: "approved"
        }

        const preference = new preference(client);
        const result = await preference.create({ body })

        res.json({
            id: result.id
        })

    }   catch (error) {
        console.log(error)
        res.status(500).json({
            error: "Error al crear la preferencia"
        })

    }

})
app.listen(port, () => {
    console.log(`SRV running on port ${port}`)
})
