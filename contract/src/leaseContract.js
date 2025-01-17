// leaseContract.js
import { assert, details } from '@agoric/assert';

const start = async (zcf) => {
  const leases = new Map();

  const makeLease = (equipmentId, owner, price, duration) => {
    return { equipmentId, owner, price, duration, lessee: null };
  };

  const createLease = (equipmentId, owner, price, duration) => {
    assert(!leases.has(equipmentId), details`Lease already exists`);
    const lease = makeLease(equipmentId, owner, price, duration);
    leases.set(equipmentId, lease);
    return lease;
  };

  const startLease = (equipmentId, lessee) => {
    const lease = leases.get(equipmentId);
    assert(lease, details`No lease found for equipment: ${equipmentId}`);
    assert(!lease.lessee, details`Equipment already leased`);
    lease.lessee = lessee;
    return lease;
  };

  const publicFacet = harden({
    createLease,
    startLease,
    getLease: (equipmentId) => leases.get(equipmentId),
  });

  return harden({ publicFacet });
};

harden(start);
export { start };
