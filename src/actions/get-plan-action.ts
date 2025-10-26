'use server';
import { getAuth } from "./get-user";

export const getPlanAction = async ()=>{
  const user = await getAuth();
  return {plan:user.plan}
}