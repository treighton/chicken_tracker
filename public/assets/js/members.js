$(document).ready(() => {
  
  $('#add-flock').on('submit', (e) => {
    e.preventDefault()
    const flock = {
      startDate: $('#start-date').val(),
      birdCount: $('#bird-count').val()
    }
    
    $.post("/api/add_flock", flock).then(data => {
      console.log(data)
    });
  })

  console.log('poop')

  $('#add-record').on('submit', (e) => {
    e.preventDefault()

    const record = {
      flockId: $('#add-record').data('flock'),
      date: $('#start-date').val(),
      temperature: $('#temp').val(),
      feed: $('#feed').val(),
      bedding: $('#bedding').is(':checked'),
      mortality: $('#mortality').val(),
      notes: $('#note').val()
    }
    console.log(record)
    $.post("/api/add_record", record).then(data => {
      console.log(data)
  });
  })
});
