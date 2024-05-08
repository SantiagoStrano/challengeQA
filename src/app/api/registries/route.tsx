import { HttpStatusCode } from 'axios';
import connectMongo from '../../utils/mongo-connect';
import { NextResponse } from 'next/server';
import Registry from '../../models/Registry';

export async function POST(req: any) {
	try {
		await connectMongo();
		const body = await req.json();
		if (body.name) {
			const registries = await Registry.create(body);
			return NextResponse.json(
				{ registries, message: 'created' },
				{ status: HttpStatusCode.Created }
			);
		}
		return NextResponse.json(
			{ message: 'is missing' },
			{ status: HttpStatusCode.BadRequest }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: error },
			{ status: HttpStatusCode.BadRequest }
		);
	}
}
export async function GET() {
	try {
		await connectMongo();

		const registries = await Registry.find();
		return NextResponse.json({ data: registries });
	} catch (error) {
		return NextResponse.json({ error });
	}
}

