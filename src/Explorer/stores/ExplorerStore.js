import { observable, action } from "mobx";
import { axiosInstance } from "../../api/axios-instance";

export class ExplorerStore {
    @observable
    btfsHashes = [];
    ethereumPlasma = [];
    distributedStorage = [];
    ethereumMainne = [];
    binanceSmartChain = [];

    @observable
    pending = false;

    @observable
    error = undefined;

    @action
    fetchBtfsHashes = () => {
        this.pending = true;
        this.error = undefined;

        axiosInstance
            .get("/api/v3/btfs")
            .then(({ data }) => {
                this.btfsHashes = data;
                this.pending = false;
            })
            .catch(error => (this.error = error));
    };

    @action
    fetchEthereumPlasma = () => {
        this.pending = true;
        this.error = undefined;

        setTimeout(() => {
            this.ethereumPlasma = [
                {
                    "txnId": "0x8fb47870f1ae62acea47fdb66227d478d70caaa0afd28cddac56bc36a3508cd4",
                    "age": "58 secs ago",
                    "node": "0x194208845439fCA4297fF85deB1c71091e9f5f97",
                    "btfs_cid": "QmeLdR575fZvgEskZuZwno7SLMNrsVBgn4LsRe41SA2GWq"
                },
                {
                    "txnId": "0x8fb47870f1ae62acea47fdb66227d478d70caaa0afd28cddac56bc36a3508cd4",
                    "age": "58 secs ago",
                    "node": "0x194208845439fCA4297fF85deB1c71091e9f5f97",
                    "btfs_cid": "QmeLdR575fZvgEskZuZwno7SLMNrsVBgn4LsRe41SA2GWq"
                },
                {
                    "txnId": "0x8fb47870f1ae62acea47fdb66227d478d70caaa0afd28cddac56bc36a3508cd4",
                    "age": "58 secs ago",
                    "node": "0x194208845439fCA4297fF85deB1c71091e9f5f97",
                    "btfs_cid": "QmeLdR575fZvgEskZuZwno7SLMNrsVBgn4LsRe41SA2GWq"
                },
                {
                    "txnId": "0x8fb47870f1ae62acea47fdb66227d478d70caaa0afd28cddac56bc36a3508cd4",
                    "age": "58 secs ago",
                    "node": "0x194208845439fCA4297fF85deB1c71091e9f5f97",
                    "btfs_cid": "QmeLdR575fZvgEskZuZwno7SLMNrsVBgn4LsRe41SA2GWq"
                },
                {
                    "txnId": "0x8fb47870f1ae62acea47fdb66227d478d70caaa0afd28cddac56bc36a3508cd4",
                    "age": "58 secs ago",
                    "node": "0x194208845439fCA4297fF85deB1c71091e9f5f97",
                    "btfs_cid": "QmeLdR575fZvgEskZuZwno7SLMNrsVBgn4LsRe41SA2GWq"
                }
            ];
            this.pending = false;
        }, 1500);
    };

    @action
    fetchDistributedStorage = () => {
        this.pending = true;
        this.error = undefined;

        setTimeout(() => {
            this.distributedStorage = [
                {
                    "btfs_cid": "QmeLdR575fZvgEskZuZwno7SLMNrsVBgn4LsRe41SA2GWq",
                    "age": "58 secs ago",
                    "node": "0x194208845439fCA4297fF85deB1c71091e9f5f97",
                    "soter_link": "https://sandbox.btfssoter.io/btfs/QmeLdR575fZvgEskZuZwno7SLMNrsVBgn4LsRe41SA2GWq",
                },
                {
                    "btfs_cid": "QmeLdR575fZvgEskZuZwno7SLMNrsVBgn4LsRe41SA2GWq",
                    "age": "58 secs ago",
                    "node": "0x194208845439fCA4297fF85deB1c71091e9f5f97",
                    "soter_link": "https://sandbox.btfssoter.io/btfs/QmeLdR575fZvgEskZuZwno7SLMNrsVBgn4LsRe41SA2GWq",
                },
                {
                    "btfs_cid": "QmeLdR575fZvgEskZuZwno7SLMNrsVBgn4LsRe41SA2GWq",
                    "age": "58 secs ago",
                    "node": "0x194208845439fCA4297fF85deB1c71091e9f5f97",
                    "soter_link": "https://sandbox.btfssoter.io/btfs/QmeLdR575fZvgEskZuZwno7SLMNrsVBgn4LsRe41SA2GWq",
                },
                {
                    "btfs_cid": "QmeLdR575fZvgEskZuZwno7SLMNrsVBgn4LsRe41SA2GWq",
                    "age": "58 secs ago",
                    "node": "0x194208845439fCA4297fF85deB1c71091e9f5f97",
                    "soter_link": "https://sandbox.btfssoter.io/btfs/QmeLdR575fZvgEskZuZwno7SLMNrsVBgn4LsRe41SA2GWq",
                },
                {
                    "btfs_cid": "QmeLdR575fZvgEskZuZwno7SLMNrsVBgn4LsRe41SA2GWq",
                    "age": "58 secs ago",
                    "node": "0x194208845439fCA4297fF85deB1c71091e9f5f97",
                    "soter_link": "https://sandbox.btfssoter.io/btfs/QmeLdR575fZvgEskZuZwno7SLMNrsVBgn4LsRe41SA2GWq",
                }
            ];
            this.pending = false;
        }, 1500);
    };

    @action
    fetchEthereumMainne = () => {
        this.pending = true;
        this.error = undefined;

        setTimeout(() => {
            this.ethereumMainne = [
                {
                    "txnId": "0x8fb47870f1ae62acea47fdb66227d478d70caaa0afd28cddac56bc36a3508cd4",
                    "age": "58 secs ago",
                    "from": "0xffc9ee97a4c75543bac09dea769e6ecaed484dac",
                    "to": "0x5f5b176553e51171826d1a62e540bc30422c7717",
                    "value": "0.2254"
                },
                {
                    "txnId": "0x8fb47870f1ae62acea47fdb66227d478d70caaa0afd28cddac56bc36a3508cd4",
                    "age": "58 secs ago",
                    "from": "0xffc9ee97a4c75543bac09dea769e6ecaed484dac",
                    "to": "0x5f5b176553e51171826d1a62e540bc30422c7717",
                    "value": "0.2254"
                },
                {
                    "txnId": "0x8fb47870f1ae62acea47fdb66227d478d70caaa0afd28cddac56bc36a3508cd4",
                    "age": "58 secs ago",
                    "from": "0xffc9ee97a4c75543bac09dea769e6ecaed484dac",
                    "to": "0x5f5b176553e51171826d1a62e540bc30422c7717",
                    "value": "0.2254"
                },
                {
                    "txnId": "0x8fb47870f1ae62acea47fdb66227d478d70caaa0afd28cddac56bc36a3508cd4",
                    "age": "58 secs ago",
                    "from": "0xffc9ee97a4c75543bac09dea769e6ecaed484dac",
                    "to": "0x5f5b176553e51171826d1a62e540bc30422c7717",
                    "value": "0.2254"
                },
                {
                    "txnId": "0x8fb47870f1ae62acea47fdb66227d478d70caaa0afd28cddac56bc36a3508cd4",
                    "age": "58 secs ago",
                    "from": "0xffc9ee97a4c75543bac09dea769e6ecaed484dac",
                    "to": "0x5f5b176553e51171826d1a62e540bc30422c7717",
                    "value": "0.2254"
                },
            ];
            this.pending = false;
        }, 1500);
    };

    @action
    fetchBinanceSmartChain = () => {
        this.pending = true;
        this.error = undefined;

        setTimeout(() => {
            this.binanceSmartChain = [
                {
                    "txnId": "0x8fb47870f1ae62acea47fdb66227d478d70caaa0afd28cddac56bc36a3508cd4",
                    "age": "58 secs ago",
                    "from": "0xffc9ee97a4c75543bac09dea769e6ecaed484dac",
                    "to": "none",
                    "value": "0.2254",
                    "btfs_cid": "QmeLdR575fZvgEskZuZwno7SLMNrsVBgn4LsRe41SA2GWq"
                },
                {
                    "txnId": "0x8fb47870f1ae62acea47fdb66227d478d70caaa0afd28cddac56bc36a3508cd4",
                    "age": "58 secs ago",
                    "from": "0xffc9ee97a4c75543bac09dea769e6ecaed484dac",
                    "to": "none",
                    "value": "0.2254",
                    "btfs_cid": "QmeLdR575fZvgEskZuZwno7SLMNrsVBgn4LsRe41SA2GWq"
                },
                {
                    "txnId": "0x8fb47870f1ae62acea47fdb66227d478d70caaa0afd28cddac56bc36a3508cd4",
                    "age": "58 secs ago",
                    "from": "0xffc9ee97a4c75543bac09dea769e6ecaed484dac",
                    "to": "none",
                    "value": "0.2254",
                    "btfs_cid": "QmeLdR575fZvgEskZuZwno7SLMNrsVBgn4LsRe41SA2GWq"
                },
                {
                    "txnId": "0x8fb47870f1ae62acea47fdb66227d478d70caaa0afd28cddac56bc36a3508cd4",
                    "age": "58 secs ago",
                    "from": "0xffc9ee97a4c75543bac09dea769e6ecaed484dac",
                    "to": "none",
                    "value": "0.2254",
                    "btfs_cid": "QmeLdR575fZvgEskZuZwno7SLMNrsVBgn4LsRe41SA2GWq"
                },
                {
                    "txnId": "0x8fb47870f1ae62acea47fdb66227d478d70caaa0afd28cddac56bc36a3508cd4",
                    "age": "58 secs ago",
                    "from": "0xffc9ee97a4c75543bac09dea769e6ecaed484dac",
                    "to": "none",
                    "value": "0.2254",
                    "btfs_cid": "QmeLdR575fZvgEskZuZwno7SLMNrsVBgn4LsRe41SA2GWq"
                },
            ];
            this.pending = false;
        }, 1500);
    };
}
