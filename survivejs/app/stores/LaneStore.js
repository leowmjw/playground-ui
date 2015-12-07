/**
 * Created by leow on 12/2/15.
 */
import uuid from 'node-uuid';
import alt from '../libs/alt';
import LaneActions from '../actions/LaneActions';
import NoteStore from '../stores/NoteStore';

class LaneStore {

    constructor() {
        this.bindActions(LaneActions);
        // Above match to mapped actions
        // below are the properties ..
        this.lanes = [];
    }

    create(lane) {
        const lanes = this.lanes;

        lane.id = uuid.v4();
        lane.notes = lane.notes || [];

        this.setState({
            lanes: lanes.concat(lane)
        });
    }

    update({id, name}) {
        const lanes = this.lanes;
        const targetId = this.findLane(id);

        if (targetId < 0) {
            return;
        }

        lanes[targetId].name = name;

        this.setState({lanes});
    }

    delete(id) {
        const lanes = this.lanes;
        const targetId = this.findLane(id);

        if (targetId < 0) {
            return;
        }

        this.setState({
            lanes: lanes.slice(0, targetId).concat(lanes.slice(targetId + 1))
        })
    }

    attachToLane({laneId, noteId}) {

        if (!noteId) {
            this.waitFor(NoteStore);

            noteId = NoteStore.getState().notes.slice(-1)[0].id;
        }

        const lanes = this.lanes;
        const targetId = this.findLane(laneId);

        if (targetId < 0) {
            return;
        }

        const lane = lanes[targetId];

        if (lane.notes.indexOf(noteId) === -1) {
            lane.notes.push(noteId);

            this.setState({lanes});
        } else {
            console.warn('Already atatched note to lane', lanes);
        }
    }

    detachFromLane({laneId, noteId}) {
        const lanes = this.lanes;
        const targetId = this.findLane(laneId);

        if (targetId < 0) {
            return;
        }

        const lane = lanes[targetId];
        const notes = lane.notes;
        const removeIndex = notes.indexOf(noteId);

        if (removeIndex !== -1) {
            lane.notes = notes.slice(0, removeIndex).concat(notes.slice(removeIndex + 1));

            this.setState({lanes});
        } else {
            console.warn('Failed t remove nore from a lane as it did not exist', lanes);
        }
    }

    findLane(id) {
        const lanes = this.lanes;
        const laneIndex = lanes.findIndex((lane) => lane.id === id);

        if (laneIndex < 0) {
            console.warn('Failed to find lane', lanes, id);
        }

        return laneIndex;
    }
}

export default alt.createStore(LaneStore, 'LaneStore');