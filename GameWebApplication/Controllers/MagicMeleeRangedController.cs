using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using GameWebApplication.Data;
using GameWebApplication.Models;

namespace GameWebApplication.Controllers
{
    public class MagicMeleeRangedController : Controller
    {
        private readonly ApplicationDbContext _context;

        public MagicMeleeRangedController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: MagicMeleeRanged
        public async Task<IActionResult> Index()
        {
              return View(await _context.MagicMeleeRanged.ToListAsync());
        }

        // GET: MagicMeleeRanged/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.MagicMeleeRanged == null)
            {
                return NotFound();
            }

            var magicMeleeRanged = await _context.MagicMeleeRanged
                .FirstOrDefaultAsync(m => m.Id == id);
            if (magicMeleeRanged == null)
            {
                return NotFound();
            }

            return View(magicMeleeRanged);
        }

        // GET: MagicMeleeRanged/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: MagicMeleeRanged/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Win,Loss,Tie,UserChoice,ComputerChoice,TimeToChoice")] MagicMeleeRanged magicMeleeRanged)
        {
            if (ModelState.IsValid)
            {
                _context.Add(magicMeleeRanged);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(magicMeleeRanged);
        }

        // GET: MagicMeleeRanged/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.MagicMeleeRanged == null)
            {
                return NotFound();
            }

            var magicMeleeRanged = await _context.MagicMeleeRanged.FindAsync(id);
            if (magicMeleeRanged == null)
            {
                return NotFound();
            }
            return View(magicMeleeRanged);
        }

        // POST: MagicMeleeRanged/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Win,Loss,Tie,UserChoice,ComputerChoice,TimeToChoice")] MagicMeleeRanged magicMeleeRanged)
        {
            if (id != magicMeleeRanged.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(magicMeleeRanged);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!MagicMeleeRangedExists(magicMeleeRanged.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(magicMeleeRanged);
        }

        // GET: MagicMeleeRanged/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.MagicMeleeRanged == null)
            {
                return NotFound();
            }

            var magicMeleeRanged = await _context.MagicMeleeRanged
                .FirstOrDefaultAsync(m => m.Id == id);
            if (magicMeleeRanged == null)
            {
                return NotFound();
            }

            return View(magicMeleeRanged);
        }

        // POST: MagicMeleeRanged/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.MagicMeleeRanged == null)
            {
                return Problem("Entity set 'ApplicationDbContext.MagicMeleeRanged'  is null.");
            }
            var magicMeleeRanged = await _context.MagicMeleeRanged.FindAsync(id);
            if (magicMeleeRanged != null)
            {
                _context.MagicMeleeRanged.Remove(magicMeleeRanged);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool MagicMeleeRangedExists(int id)
        {
          return _context.MagicMeleeRanged.Any(e => e.Id == id);
        }
    }
}
