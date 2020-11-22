const rules = {
  vin: [
    v => !!v || 'VIN# cannot be blank!',
    v => (v && /^([A-Z]){4}([0-9]){6}$/.test(v)) || 'VIN# form must be 4 uppercase chars (A-Z) and 6 digits'
  ],
  make: [v => !!v || 'Make cannot be blank!'],
  model: [v => !!v || 'Model cannot be blank!'],
  year: [
    v => !!v || 'Year cannot be blank!',
    v => (v && v >= 1900) || 'Year must be equal to or greater than 1900',
    v => (v && v < 3000) || "Let's just set year 2999 at max",
  ],
  msrp: [
    v => !!v || 'MSRP cannot be blank!',
    v => (v && v > 0) || 'Money amount cannot be negative or zero!',
  ],
}

export default rules;