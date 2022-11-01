const distinctSeatSetSize = () => switchMap((params) => this.projectionsService.getProjectionById(params['hallId'], params['projectionId'])),
pairwise(),
filter(([{ seatSet:oldSet }, { seatSet:newSet }]) => filterAvailableSeats(oldSet) !== filterAvailableSeats(newSet)),
map(([_,newValue]) => newValue)