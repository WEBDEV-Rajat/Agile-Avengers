import React, { useState } from 'react';
import Navbar from '../Navigationbar';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Manage = () => {
  const cards = [
    {
      link: '/recurring-transactions',
      title: 'Create Recurring Transactions',
      desc: 'Set up automated recurring transactions to streamline financial processes and ensure consistent, timely payments.',
      button: 'View Pending Transactions'
    },
    {
      link: '/budget-plan',
      title: 'Create Budget Plan',
      desc: 'Develop a comprehensive budget plan that allocates resources effectively, prioritizes essential expenses, and incorporates contingencies to ensure financial stability and support long-term goals.',
      button: 'View Budget Plans'
    },
    {
      link: '/savings',
      title: 'Create Savings Plan',
      desc: 'Implement a structured savings plan that allocates a portion of income toward financial goals, ensuring disciplined contributions to build long-term financial security.',
      button: 'View Saving Plans'
    },
    {
      link: '/income-categories',
      title: 'Manage Income Categories',
      desc: 'Organize income sources into defined categories to streamline financial tracking and enable more accurate budgeting and reporting.',
      button: 'View Income Categories'
    },
    {
      link: '/expense-categories',
      title: 'Manage Expense Categories',
      desc: 'Effectively managing expense categories enables precise tracking of financial allocations, facilitating better budgeting and insightful spending analysis.',
      button: 'View Expense Categories'
    }
  ];

  return (
    <div>
      <Navbar />
      <div className='relative top-20 w-full h-auto p-6'>
        <h1 className='text-3xl font-bold text-center text-green-700 mb-8'>Manage Your Finances</h1>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8'>
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, type: 'spring' }}
              className='bg-white shadow-md rounded-xl p-6 border border-gray-300 hover:shadow-xl flex flex-col items-center text-center hover:bg-gray-50 transition duration-300'
            >
              <h2 className='text-xl font-semibold text-green-700 mb-2'>{card.title}</h2>
              <p className='text-gray-600 mb-4'>{card.desc}</p>
              <Link
                to={card.link}
                className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-300'
              >
                {card.button}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Manage;
