import { otherDB } from "./db";

export interface WhosWho {value: { committees: {staffs_ids: {key: string; position: string}[]; title: string}[]}, key: string}

export async function getCommittee(name:string) {
   const {value} = await otherDB.get('who-is-who') as unknown as WhosWho
   const commitee = value.committees.filter(c => c.title === name)[0]
    if (!commitee) {
        return null
    }
    return commitee
}

export async function getAllCommittee(){
    const {value} = await otherDB.get('who-is-who') as unknown as WhosWho
    return value.committees
}

export async function createCommittee(committee: WhosWho['value']['committees'][0]) {
    const data = await otherDB.get('who-is-who') as unknown as WhosWho
    const remove = data.value.committees.filter(c => c.title !== committee.title)
    data.value.committees = [...remove, committee]
    await otherDB.put(data as {}, 'who-is-who')
    return data
}


