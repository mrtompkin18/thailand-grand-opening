import numeral from "numeral";
import { generateOpenGrahpImage } from "../../../lib/getOgImage";

export default async function handler(req, res) {
    const { title, sub_title, desc } = req.query;

    const file = await generateOpenGrahpImage(title, sub_title, desc);

    res.status(200).end(file);
}