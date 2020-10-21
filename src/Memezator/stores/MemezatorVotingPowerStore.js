import { observable, action } from "mobx";
import { axiosInstance } from "../../api/axios-instance";

const BUY_VOTING_POWER_FORM = {
    tokens: "",
    quantity: ""
};

export class MemezatorVotingPowerStore {
    @observable
    buyVotingPowerForm = BUY_VOTING_POWER_FORM;

    @observable
    buyVotingPowerHash = undefined;

    @observable
    buyVotingPowerDialogOpen = false;

    @observable
    buyVotingPowerVisibleCode = false;

    @observable
    pending = false;

    @action
    setBuyVotingPowerDialogOpen = buyVotingPowerDialogOpen => {
        this.buyVotingPowerDialogOpen = buyVotingPowerDialogOpen;
        if (buyVotingPowerDialogOpen) {
            this.buyVotingPowerVisibleCode = false;
            this.buyVotingPowerHash = undefined;
        }
        if (!buyVotingPowerDialogOpen) {
            this.buyVotingPowerForm = BUY_VOTING_POWER_FORM;
        }
    };

    @action
    buyVotingPower = () => {
        this.pending = true;
        axiosInstance
            .get("/api/v1/memezator/voting-power-purchase-address")
            .then(({ data }) => {
                this.buyVotingPowerHash = data.votingPowerPurchaseAddress;
                this.buyVotingPowerVisibleCode = true;
            })
            .finally(() => (this.pending = false));
    };

    @action
    fetchConfirmTransaction = () => {
        // ...
        this.buyVotingPowerDialogOpen = false;
        this.buyVotingPowerForm = BUY_VOTING_POWER_FORM;
    };

    @action
    setFormValueTokens = tokens => {
        this.buyVotingPowerForm.tokens = tokens;
        this.buyVotingPowerForm.quantity = parseFloat(tokens) * 500;
    };

    @action
    setFormValueQuantity = quantity => {
        this.buyVotingPowerForm.quantity = quantity;
        this.buyVotingPowerForm.tokens = quantity / 500;
    };
}
