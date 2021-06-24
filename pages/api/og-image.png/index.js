
import { generateOpenGrahpImage } from "../../../lib/getOgImage";

export default async function handler(req, res) {

    const file = await generateOpenGrahpImage();

    res.status(200).end(file);
}