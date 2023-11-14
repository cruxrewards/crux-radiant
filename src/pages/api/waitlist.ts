import { NextApiRequest, NextApiResponse } from "next";
import {google} from "googleapis"

type SheetForm = {
    email: string
}

var GOOGLE_CLIENT_EMAIL="waitlist@crux-384101.iam.gserviceaccount.com"
var GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDSzSpPzBWtXw5L\nlIx+X29d8Z5w/cGlZ6wpMfagm5pRxVNkL1LHgsUort4kbavSGFJ66rdUNps4H9lL\nb+a6cDQb7JSW1sJfnfO/YoIie7lQfLZmsp1fEsPtEGPzJnguqkJSD2wFlS3m4ZRl\ntqgrQw+Gr9pHLF7c0VtfTU0QNNjg6lWWbKcu/WFx3R45i2r4XHh/V5i6ZSdiEGPj\nmkgRXPbJ9llHUxWAln4qniD/Zr+zpG/ckjWSfbkevWnxZuYobwsoUHSLIZoWBqZv\nvKGQS9KBlaxhtBQr7L5Wy3HrmcQpoAhWkv70fy/UqAmFhV69j/GqK7CIqx0ZP4Iv\nJBeB9lVxAgMBAAECggEAKpY4Tha06mmhwbMpDv7IyPnfQISDcp8XMNtfL+M/sfVj\ne4Hz/0pz+lwZlNJzO+aeAycYEnNVuGj2xT6+Jjw0ys9o1XBdpGOMssV79Ot57MDF\nOMos8OAhpOsCxkSnUwYij+F9uUMCGvrHuCTGpLbPlC5Css5L++BvzTkYsIV8qzNO\naTMS2AI07YKrFZZNPNWEOLIMSVPIRkP4raXERoyUj1HhRsZTkAKEP99NLYw9cZRN\nhHnp7O/6Va6wuhWrQbGv5svr+D0rtMOjphC2t68lx2hhCX1ONDE1qZzgGKLGsU2k\nr/kepJdsvLN1S3CWAnR052D3qhnmrFYUfdqGaA/XYQKBgQDqdrl9BgCe5ZVdag/g\nYBHItRCR9nK+UTUdqHSJpccvLP4F9yCL4tSxElEWL5uDyrYELhKcg3hL16JQdqOk\njzFV8SOMuW7OqZKb5+lXfGfVMVsZil5iSSM43qYanK0UybPHMLXw5bLkYQt9sBeg\nAwJ1UaF9UOQ3xJxjingFFL9LCwKBgQDmKgjvecnttb46ineepJz1H2LtfKMG9RYS\n/+8ahxogyirlKp3/NRLtYJ+zKt/nVy+216exDoU1e4YEHksef3fWdoV8O/GFAWzq\n8TwSYlsk8KujWygRwp/gNqp9aIvd2vduNOj+A9pYXXzzzUV/3mQypIe+X4AJQEgm\ndL1QZ4aO8wKBgGjpmRQ9dFelaVF0XQhMVIjXpEN74FoSok7UCtlwyZDtc/kdXH3b\nkMpu5MOlp9OwCAQUzZUlKtXc9i9E9vJydGP9U6frbY6hyA1lFz9jVl7KB/aEuLkH\n+u++iNrNkpEDtCMEQ9U4IvUYC3lBK0EZN6dhUH5vjL77hfLwicXUQ8iDAoGAW/xQ\nteSmnyoTbLIKPIztbcmtb9xwC0fIGq/Oj3uPJaummQ//NQ+xEM2dBa4M7hgaKajm\njAyRkF5doSe6PeYTrtKPZqdOTynSrdLbfz1vz8Of1RmJWg++dY1jddtiirgISzM6\nKsq/aLF0TrurGv92bAb1eVARi6D1NOlS/99gF6ECgYEAozJvihvJwqyVfJwvf6tT\n6efG81laU8KjtWJNtX2iKgRUF+yHNg/tiBY7pWRwU/z9B9qw+LgkZIJoQZAkWz0O\nrep7yITUaQxDW7vXjnMw4TWD0wj1mJQKLh3JhQl6KJEEryh6tbUC/AxwFIiBkiR5\nCqexOB1ZKMaYsi5Z/pmLfMc=\n-----END PRIVATE KEY-----\n"
var GOOGLE_SHEET_ID="1fEVLXbZ4ZsUxLRyoy1d4xYra2kVr6gJ3SDdvjeQ0QEY"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).send({message: 'Only POST requestes are allowed'})
    }

    const body = req.body as SheetForm

    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: GOOGLE_CLIENT_EMAIL,
                private_key: GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '/n')
            },
            scopes: [
                'https://www.googleapis.com/auth/drive',
                'https://www.googleapis.com/auth/drive.file',
                'https://www.googleapis.com/auth/spreadsheets',
            ]
        });

        const sheets = google.sheets({
            auth,
            version: 'v4'
        });

        const timestamp = new Date().toISOString();

        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: GOOGLE_SHEET_ID,
            range: 'A1:B1',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [
                    [timestamp, body.email]
                ]
            }
        });

        return res.status(200).json({
            data: response.data
        })
    } catch (e: any) {
        return res.status(500).send({message: e.message ?? 'Unknown Error'})
    }
}
