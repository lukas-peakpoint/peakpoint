(() => {
  function toKebabCase(str) {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .toLowerCase();
  }

  function toJobDataset(str) {
    return `job${str.charAt(0).toUpperCase() + str.slice(1)}`;
  }

  window.addEventListener('jobDataReady', () => {
    console.log('JOB DATA READY');
    
    const jobs = window.jobData; // Get all jobs fetched by api
    const categories = window.categoryData;
    const contractTypes = window.contractTypesData;
    const jobsComponent = document.getElementById('jobs-component');
    const jobCardTemplate = jobsComponent.querySelector('[data-job-card-template="true"]')
    
    console.log(jobData);
    console.log(contractTypes);

    jobs.forEach(job => {
      const jobCard = jobCardTemplate.cloneNode(true);
      jobCard.classList.remove('hide');
      jobCard.classList.remove('is-template');
      jobCard.style.display = "flex";
      const props = ['title', 'accessionPer', 'rate', 'categoryNames', 'contractTypeName'];

      // Determine rate
      if (job.isparttime) {
        job.rate = `${job.parttimefrom}-${job.parttimeto}%`;
      } else {
        job.rate = `Vollzeit 100%`;
      }

      // Determine category names
      job.categorynames = job.categories
        .map(category => {
          console.log('CATEGORY NAME:', category.name);
          return category ? category.name : '';
        })
        .filter(name => name !== null)
        .join(', ');

      job.contracttypename = contractTypes.find(type => type.key === job.contracttype)?.value

      props.forEach(prop => {
          const attr = `[data-job-${toKebabCase(prop)}]:not(a)`;
          const el = jobCard.querySelector(attr);
          // console.log(el);
          el.innerText = job[prop.toLowerCase()];
          el.dataset[toJobDataset(prop)] = job[prop.toLowerCase()] || "init";
        });

      const cardLink = jobCard.querySelector('a');
      cardLink.href = `/job?id=${job.identitynumber}`;
      cardLink.target = ""

      jobsComponent.appendChild(jobCard);
      console.log(job);
    });
  })
})();