import connectMongo from '../../../utils/mongo-connect';
import { NextResponse } from 'next/server';
import Registry from '../../../models/Registry';
import {  ObjectId } from 'mongodb';

export async function GET(_request:any, { params }: { params: { id: number }} ) {
    let id = params.id;
	try {
		await connectMongo();
		const registry = await Registry.findOne({ _id: id });
		return NextResponse.json({ data: registry });
	} catch (error) {
		return NextResponse.json({ error });
	}
}


export async function PUT(request: any, { params }: { params: { id: ObjectId } }) {
	const { id } = params;
	try {
	  await connectMongo();
	  const body = await request.json();
	  console.log(`body: ${JSON.stringify(body)}`);
	  const updatedRegistry = await Registry.findByIdAndUpdate(id, body, { new: true }); 
	  return NextResponse.json({ data: updatedRegistry }, { status: 200 });
	} catch (error) {
	  console.error("Update error:", error);
	  return NextResponse.json({ message: "Update failed", error }, { status: 500 });
	}
  }