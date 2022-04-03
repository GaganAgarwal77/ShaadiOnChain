import React , { useState, useEffect} from 'react'
import  '../assets/Market.css'
import  '../assets/Card.css'
import { useHistory } from 'react-router-dom'
import { loadAccount, getUser, getAllEngagementProposals, getMarriageProposalByUser } from "./services/web3";
import { getImageFromTokenId } from "./services/utility";

function RecievedProposals() {

    const { push } = useHistory()

    const [engageProposals, setEngageProposals] = useState([]);
    const [hasMarriageProposal, setHasMarriageProposal] = useState(false);
    const [marriageProposal, setMarriageProposal] = useState({
        name: "",
        proposalId: "",
        image: "",
        note: "",
        status: "",
    });

    useEffect(() => {
        const fetchEngageProposals = async () => {
            const myAddress = await loadAccount();
            const engagementProposals = await getAllEngagementProposals();
            engagementProposals.forEach(async function(proposal, index, object) {
                if (proposal.proposer === myAddress) {
                    return;
                }
                const user = await getUser(proposal.proposer);
                const image = await getImageFromTokenId(proposal.proposerRingTokenId);
    
                const engageProposal = {
                    name: user.name,
                    proposalId: proposal.id,
                    image: image,
                    note: proposal.proposerNote,
                    status: proposal.status,
                }
                setEngageProposals((arr) => [...arr, engageProposal]);
              });
        };

        const fetchMarriageProposal = async () => {
            const myAddress = await loadAccount();
            const proposal = await getMarriageProposalByUser();
            if (proposal === false) {
                return;
            }
            if (proposal.proposer === myAddress) {
                return;
            }
            const user = await getUser(proposal.proposer);

            const marriageProposal = {
                name: user.name,
                proposalId: proposal.id,
                vows: proposal.proposerVows,
                status: proposal.status,
            }
            setMarriageProposal(marriageProposal);
            setHasMarriageProposal(true);
        };

        fetchEngageProposals();
        fetchMarriageProposal();
    },[])
    

    return (
        <div>

        <h2>Engagement Proposals</h2>
        <div className='market'> 
                {engageProposals.map((proposal) => (
                    <div className='newcard' onClick={() => push('/accept-engagement-proposal/' + proposal.proposalId)} >
                        <img src={proposal.image} alt="Ring NFT" />
                        <div className="newcard__info">
                            <h2>{proposal.name}</h2>
                            <h4>{proposal.note.length >= 100 ? proposal.note.substring(0, 100) + '...' : proposal.note}</h4>
                        </div>
                        <div className='newcard__infoValueParent'>
                            <div className="newcard__infoValue">
                                {proposal.status === "0" && <button type="button" className="btn btn-warning">Waiting</button>}
                                {proposal.status === "1" && <button type="button" className="btn btn-success">Accepted</button>}
                                {proposal.status === "2" && <button type="button" className="btn btn-danger">Rejected</button>}
                            </div>
                        </div>
                    </div>
                ))
                }
        </div>

        <h2>Marriage Proposals</h2>

        <div className='market'> 
        {
            hasMarriageProposal &&
            (
                <div className='newcard' onClick={() => push('/accept-marriage-proposal/' + marriageProposal.proposalId)}>
                <img src='/assets/images/certificate.jpeg' alt="nft artwork" />
                <div className="newcard__info">
                    <h2>{marriageProposal.name}</h2>
                    <h4>{marriageProposal.vows.length >= 100 ? marriageProposal.vows.substring(0, 100) + '...' : marriageProposal.vows}</h4>
                </div>
                <div className='newcard__infoValueParent'>
                    <div className="newcard__infoValue">
                        {marriageProposal.status === "0" && <button type="button" className="btn btn-warning">Waiting</button>}
                        {marriageProposal.status === "1" && <button type="button" className="btn btn-success">Accepted</button>}
                        {marriageProposal.status === "2" && <button type="button" className="btn btn-danger">Rejected</button>}
                    </div>
                </div>
                </div>
            )
        }
        </div>
        </div>
    )
}

export default RecievedProposals;