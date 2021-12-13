import { otherDB } from "./db";


export async function getHighlightedEvent(){
    const highlightedEvent = await otherDB.get('highlighted-event') as {value: {event_id: string}};
    return highlightedEvent.value.event_id;
}


export async function setHighlightedEvent(event_id: string){
    return otherDB.put({value: {event_id}}, 'highlighted-event');
}